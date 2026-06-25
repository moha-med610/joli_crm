import crypto from 'crypto';

export function generateSecurePassword(length = 16) {
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';

  let password = '';
  const maxByte = 256 - (256 % chars.length);

  while (password.length < length) {
    const buf = crypto.randomBytes(length);

    for (let i = 0; i < buf.length && password.length < length; i++) {
      if (buf[i] < maxByte) {
        password += chars[buf[i] % chars.length];
      }
    }
  }

  return password;
}
