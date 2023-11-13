export function hideEmailFN(email: string) {
  const text = email.trim();
  const index = text.indexOf('@');

  if (index === -1) {
    return null;
  }

  const average = Math.round(index / 2);

  return text.slice(0, average) + '*'.repeat(5) + '@gmail.com';
}

export function hidePhoneFN(phone: string) {
  const index = Math.round(phone.length / 2);

  return phone.slice(0, index) + '*'.repeat(5);
}

export function hideName(name: string) {
  return name.slice(0, 3) + '*'.repeat(5);
}
