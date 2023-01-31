import { useParams } from "@remix-run/react";

export default function useLocale() {
  const { lang } = useParams();
  return lang;
}
