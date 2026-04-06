const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(email: string): boolean {
  const s = email.trim();
  if (!s) return false;
  return EMAIL_RE.test(s);
}
