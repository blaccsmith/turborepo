export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export function sum(a: number, b: number) {
  return a + b;
}
