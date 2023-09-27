export function birthdayTraslator(birthday: number) {
  if (new Date(+birthday).getFullYear() >= 2000) {
    return +new Date(
      2000,
      new Date(+birthday).getMonth(),
      new Date(+birthday).getDate(),
    );
  } else {
    return +new Date(
      1970,
      new Date(+birthday).getMonth(),
      new Date(+birthday).getDate(),
    );
  }
}
