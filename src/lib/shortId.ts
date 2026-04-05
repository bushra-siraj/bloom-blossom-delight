const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

export function generateShortId(length = 7): string {
  const arr = crypto.getRandomValues(new Uint8Array(length));
  return Array.from(arr, b => CHARS[b % CHARS.length]).join('');
}
