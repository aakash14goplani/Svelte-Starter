export function isEmpty(value: string) {
  if (value) {
    return value.trim().length === 0;
  }
  return true;
}

export function isValidEmail(value: string) {
  if (value) {
    return !isEmpty(value) && /^[a-z0-9][a-z0-9-_\.]+@([a-z]|[a-z0-9]?[a-z0-9-]+[a-z0-9])\.[a-z0-9]{2,10}(?:\.[a-z]{2,10})?$/.test(value);
  }
  return false;
}