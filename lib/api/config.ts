const stripWrappingQuotes = (value: string) => value.replace(/^['"]|['"]$/g, '');

export const normalizeBaseUrl = (value?: string | null) => {
  if (!value) {
    return '';
  }

  const normalized = stripWrappingQuotes(value.trim());

  return normalized.replace(/\/+$/, '');
};

export const BACKEND_API_BASE_URL = normalizeBaseUrl(
  process.env.NEXT_PUBLIC_API_URL ?? process.env.API_URL,
);

export const APP_BASE_URL = normalizeBaseUrl(
  process.env.NEXT_PUBLIC_APP_URL ?? process.env.APP_URL,
);

export const API_REQUEST_TIMEOUT_MS = 10_000;
