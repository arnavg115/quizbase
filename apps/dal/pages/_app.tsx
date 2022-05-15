import { AppProps } from "next/app";
import { Provider } from "urql";
import { client } from "../src/urqlClient";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider value={client}>
      <Component {...pageProps} />
    </Provider>
  );
}
