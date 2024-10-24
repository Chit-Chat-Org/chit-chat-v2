import crypto from 'crypto-js';

export const hashPassword = (password: string): string => {
  // hashing logic using crypto-js
  const hashedPassword = crypto.SHA256(password).toString(crypto.enc.Hex);
  return hashedPassword;
};

export const compareHashedPassword = (inputPassword: string, hashedPassword: string): boolean => {
  // comparison logic using crypto-js
  const inputHash = crypto.SHA256(inputPassword).toString(crypto.enc.Hex);
  return inputHash === hashedPassword;
};