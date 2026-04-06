/** Base URL for the deafy-backend Nest API (no trailing slash). Server-side only. */
export function getBackendBaseUrl(): string | undefined {
  const raw = process.env.DEAFY_BACKEND_URL?.trim();
  if (!raw) return undefined;
  return raw.replace(/\/$/, "");
}

export function getBackendRegisterUrl(): string | undefined {
  const base = getBackendBaseUrl();
  if (!base) return undefined;
  return `${base}/auth/register`;
}
