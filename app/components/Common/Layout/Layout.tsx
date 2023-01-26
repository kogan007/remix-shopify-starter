import { type ReactNode } from "react";
import { Header } from "~/components/Common";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
}
