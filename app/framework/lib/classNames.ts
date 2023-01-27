export default function classNames(...classes: String[]) {
  return classes.filter(Boolean).join(" ");
}
