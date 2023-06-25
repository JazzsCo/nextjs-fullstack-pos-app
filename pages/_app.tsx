import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@material-tailwind/react";

import AdminProvider from "@/contexts/AdminContext";
import OrderProvider from "@/contexts/OrderContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <AdminProvider>
        <OrderProvider>
          <ThemeProvider>
            <Component {...pageProps} />
          </ThemeProvider>
        </OrderProvider>
      </AdminProvider>
    </SessionProvider>
  );
}
