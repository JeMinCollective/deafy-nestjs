/** Resolved download URL for the beta APK (public path or absolute URL from env). */
export function getBetaApkHref(): string {
  const fromEnv = process.env.NEXT_PUBLIC_BETA_APK_URL?.trim();
  if (fromEnv) {
    return fromEnv;
  }
  return "/beta/deafy-beta.apk";
}
