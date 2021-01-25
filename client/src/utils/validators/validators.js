export const required = value => {
    if (value) return undefined;
    return "Поле обов’язкове";
}

export const maxLengthCreator = (maxLength) => (value) => {
    if (value.length > maxLength) return `Максимальна довжина ${maxLength} символів`;
    return undefined;
}
export const minLengthCreator = (minLength) => (value) => {
    if (value.length < minLength) return `Мінімальна довжина ${minLength} символів`;
    return undefined;
}
export const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Неправильний формат адреса електронної пошти'
    : undefined