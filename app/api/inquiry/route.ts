import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { supabaseAdmin } from '@/lib/supabase';
import { isRateLimited } from '@/lib/rate-limit';
import { routing } from '@/i18n/routing';

const resend = new Resend(process.env.RESEND_API_KEY);

const ADMIN_EMAIL = 'admin@ontwikkelingtechservices.nl';
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface InquiryPayload {
  naam?: string;
  bedrijf?: string;
  email?: string;
  telefoon?: string;
  sector?: string;
  bericht?: string;
  locale?: string;
}

function stripHtml(value: string): string {
  return value.replace(/<[^>]*>/g, '').trim();
}

function getClientIp(request: NextRequest): string {
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) return forwardedFor.split(',')[0].trim();
  return request.headers.get('x-real-ip') ?? 'unknown';
}

function getSourcePath(request: NextRequest): string {
  const referer = request.headers.get('referer');
  if (!referer) return '/contact';
  try {
    return new URL(referer).pathname;
  } catch {
    return '/contact';
  }
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429 }
    );
  }

  let body: InquiryPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const naam = stripHtml(body.naam ?? '');
  const bedrijf = stripHtml(body.bedrijf ?? '');
  const email = stripHtml(body.email ?? '');
  const telefoon = stripHtml(body.telefoon ?? '');
  const sector = stripHtml(body.sector ?? '');
  const bericht = stripHtml(body.bericht ?? '');
  const taal = routing.locales.includes(body.locale as (typeof routing.locales)[number])
    ? (body.locale as string)
    : routing.defaultLocale;

  if (!naam || !bedrijf || !email || !sector || !bericht) {
    return NextResponse.json(
      { error: 'Please fill in all required fields.' },
      { status: 400 }
    );
  }

  if (!EMAIL_PATTERN.test(email)) {
    return NextResponse.json(
      { error: 'Please enter a valid email address.' },
      { status: 400 }
    );
  }

  const { error: insertError } = await supabaseAdmin.from('inquiries').insert({
    naam,
    bedrijf,
    email,
    telefoon: telefoon || null,
    sector,
    bericht,
    taal,
    bron: getSourcePath(request),
  });

  if (insertError) {
    return NextResponse.json(
      { error: 'Something went wrong saving your inquiry.' },
      { status: 500 }
    );
  }

  const { error: emailError } = await resend.emails.send({
    from: 'OTS Website <notifications@ontwikkelingtechservices.nl>',
    to: ADMIN_EMAIL,
    replyTo: email,
    subject: `New inquiry: ${bedrijf} (${sector})`,
    text: [
      `Naam: ${naam}`,
      `Bedrijf: ${bedrijf}`,
      `E-mail: ${email}`,
      `Telefoon: ${telefoon || '—'}`,
      `Sector: ${sector}`,
      `Taal: ${taal}`,
      '',
      'Bericht:',
      bericht,
    ].join('\n'),
  });

  if (emailError) {
    // The inquiry is already saved in Supabase, so this isn't fatal —
    // report success but flag that the notification email failed.
    return NextResponse.json({ success: true, notified: false }, { status: 200 });
  }

  return NextResponse.json({ success: true, notified: true }, { status: 200 });
}
