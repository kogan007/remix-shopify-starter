import { type ReactNode } from "react";
import { Header } from "~/components/Common";
import { ContextProvider } from "~/components/UI/context";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <ContextProvider>
      <Header />
      <main>{children}</main>
    </ContextProvider>
  );
}
