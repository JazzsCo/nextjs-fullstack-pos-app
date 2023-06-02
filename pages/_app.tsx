import AppProvider from "@/contexts/AppContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@material-tailwind/react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <AppProvider>
        <ThemeProvider>
          <Component {...pageProps} />
        </ThemeProvider>
      </AppProvider>
    </SessionProvider>
  );
}
