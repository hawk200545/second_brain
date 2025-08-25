let VERCEL_URL = import.meta.env.VITE_VERCEL_URL || '';

if (VERCEL_URL && !VERCEL_URL.startsWith('http')) {
  VERCEL_URL = `https://${VERCEL_URL}`;
}

if (VERCEL_URL && !VERCEL_URL.endsWith('/')) {
  VERCEL_URL += '/';
}

export { VERCEL_URL };