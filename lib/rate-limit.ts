const WINDOW_MS = 60 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;

// IP -> request timestamps within the current window. In-memory only —
// resets on redeploy/restart and isn't shared across instances. IPs live
// here transiently and are never persisted to Supabase or logged.
const requestLog = new Map<string, number[]>();

/** Returns true if `ip` has exceeded 5 requests in the past rolling hour. */
export function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (requestLog.get(ip) ?? []).filter(
    (timestamp) => now - timestamp < WINDOW_MS
  );

  if (recent.length >= MAX_REQUESTS_PER_WINDOW) {
    requestLog.set(ip, recent);
    return true;
  }

  recent.push(now);
  requestLog.set(ip, recent);
  return false;
}
