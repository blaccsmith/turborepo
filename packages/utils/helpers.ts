export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export function hyphenate(str: string) {
  return str.toLowerCase().replace(/\s+/g, '-');
}
