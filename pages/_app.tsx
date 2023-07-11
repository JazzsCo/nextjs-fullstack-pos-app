import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@material-tailwind/react";
import { Provider } from "react-redux";

import AdminProvider from "@/contexts/AdminContext";
import OrderProvider from "@/contexts/OrderContext";
import { store } from "./store";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={pageProps.session}>
        {/* <AdminProvider>
          <OrderProvider> */}
        <Provider store={store}>
          <ThemeProvider>
            <Component {...pageProps} />
          </ThemeProvider>
        </Provider>
        {/* </OrderProvider>
        </AdminProvider> */}
      </SessionProvider>
    </QueryClientProvider>
  );
}
