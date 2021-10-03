import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Grommet } from "grommet";
import { grommet } from "grommet/themes";
import { useEffect, useState } from "react";
import { supabase } from "../utils/createClient";
import { User } from "@supabase/gotrue-js";
import { NavBar } from "../components/NavBar";

function MyApp({ Component, pageProps }: AppProps) {
  const [User, setUser] = useState<User>();
  useEffect(() => {
    loadUser();
  }, []);
  const loadUser = async () => {
    const fo = await supabase.auth.user();
    setUser(fo!);
    const {} = await supabase.auth.onAuthStateChange(async () => {
      const user = await supabase.auth.user();
      setUser(user!);
    });
  };
  return (
    <Grommet theme={grommet}>
      <NavBar User={User} />
      <Component {...pageProps} />
    </Grommet>
  );
}
export default MyApp;
