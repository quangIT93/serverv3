export function hideEmailFN(email: string) {
  const index = email.indexOf('@');

  if (index === -1) {
    return null;
  }

  const average = index / 2;

  return email.slice(0, average) + 'x'.repeat(5) + '@gmail.com';
}

export function hidePhoneFN(phone: string) {
  const index = Math.round(phone.length / 2);

  return phone.slice(0, index) + 'x'.repeat(5);
}
