import { type ReactNode } from "react";
import { Footer, Header } from "~/components/Common";
import { ContextProvider } from "~/components/UI/context";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <ContextProvider>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
    </ContextProvider>
  );
}
