import "@/styles/globals.css";
import { useEffect } from "react";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@material-tailwind/react";
import { Provider } from "react-redux";

import { store } from "../store";
import { fetchAppData } from "@/store/slices/appSlice";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    store.dispatch(fetchAppData());
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <SessionProvider session={pageProps.session}>
          <ThemeProvider>
            <Component {...pageProps} />
          </ThemeProvider>
        </SessionProvider>
      </Provider>
    </QueryClientProvider>
  );
}
