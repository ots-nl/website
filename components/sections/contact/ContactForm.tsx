'use client';

import { FormEvent, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/Button';

interface FormState {
  naam: string;
  bedrijf: string;
  email: string;
  telefoon: string;
  sector: string;
  bericht: string;
}

const EMPTY_FORM: FormState = {
  naam: '',
  bedrijf: '',
  email: '',
  telefoon: '',
  sector: '',
  bericht: '',
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const labelClasses = 'block type-label text-[12px] font-medium text-muted mb-2';
const fieldClasses =
  'w-full bg-transparent border-0 border-b border-rule py-2 text-[16px] text-ink focus:border-accent focus:outline-none transition-colors duration-300';

export function ContactForm() {
  const t = useTranslations('contact.form');
  const locale = useLocale();

  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'error' | 'success'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const updateField = (field: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const requiredFieldsFilled =
      form.naam.trim() && form.bedrijf.trim() && form.email.trim() &&
      form.sector.trim() && form.bericht.trim();

    if (!requiredFieldsFilled || !EMAIL_PATTERN.test(form.email)) {
      setStatus('error');
      setErrorMessage(t('error.validation'));
      return;
    }

    setStatus('submitting');
    setErrorMessage(null);

    try {
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, locale }),
      });

      if (res.status === 429) {
        setStatus('error');
        setErrorMessage(t('error.rateLimit'));
        return;
      }

      if (!res.ok) {
        setStatus('error');
        setErrorMessage(t('error.generic'));
        return;
      }

      setStatus('success');
    } catch {
      setStatus('error');
      setErrorMessage(t('error.generic'));
    }
  };

  if (status === 'success') {
    return (
      <div>
        <h3 className="type-h3 text-ink">{t('success.title')}</h3>
        <p className="type-body text-ink-soft mt-4">{t('success.body')}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="flex flex-col gap-6">
        <div>
          <label htmlFor="naam" className={labelClasses}>
            {t('naam.label')}
          </label>
          <input
            id="naam"
            type="text"
            required
            value={form.naam}
            onChange={updateField('naam')}
            className={fieldClasses}
          />
        </div>

        <div>
          <label htmlFor="bedrijf" className={labelClasses}>
            {t('bedrijf.label')}
          </label>
          <input
            id="bedrijf"
            type="text"
            required
            value={form.bedrijf}
            onChange={updateField('bedrijf')}
            className={fieldClasses}
          />
        </div>

        <div>
          <label htmlFor="email" className={labelClasses}>
            {t('email.label')}
          </label>
          <input
            id="email"
            type="email"
            required
            value={form.email}
            onChange={updateField('email')}
            className={fieldClasses}
          />
        </div>

        <div>
          <label htmlFor="telefoon" className={labelClasses}>
            {t('telefoon.label')}
          </label>
          <input
            id="telefoon"
            type="text"
            value={form.telefoon}
            onChange={updateField('telefoon')}
            className={fieldClasses}
          />
        </div>

        <div>
          <label htmlFor="sector" className={labelClasses}>
            {t('sector.label')}
          </label>
          <select
            id="sector"
            required
            value={form.sector}
            onChange={updateField('sector')}
            className={fieldClasses}
          >
            <option value="" disabled>
              {t('sector.placeholder')}
            </option>
            <option value="hospitality">{t('sector.options.hospitality')}</option>
            <option value="clinic">{t('sector.options.clinic')}</option>
            <option value="professional">{t('sector.options.professional')}</option>
            <option value="other">{t('sector.options.other')}</option>
          </select>
        </div>

        <div>
          <label htmlFor="bericht" className={labelClasses}>
            {t('bericht.label')}
          </label>
          <textarea
            id="bericht"
            required
            rows={4}
            value={form.bericht}
            onChange={updateField('bericht')}
            className={fieldClasses}
          />
        </div>

        <label className="flex items-start gap-3 type-body-sm text-ink-soft">
          <input
            type="checkbox"
            required
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-1"
          />
          <span>{t('consent')}</span>
        </label>

        {status === 'error' && errorMessage && (
          <p className="type-body-sm text-accent-deep">{errorMessage}</p>
        )}

        <Button
          type="submit"
          disabled={!consent || status === 'submitting'}
          className="w-full sm:w-auto justify-center"
        >
          {status === 'submitting' ? t('submitting') : t('submit')}
        </Button>

        <p className="type-caption text-muted">
          <Link href={t('privacyHref')} className="underline hover:text-ink-soft">
            {t('privacyLinkLabel')}
          </Link>
        </p>
      </div>
    </form>
  );
}
