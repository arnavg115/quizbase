import { User } from "@supabase/gotrue-js";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { supabase } from "../utils/createClient";
import Router from "next/router";
const Home: NextPage = () => {
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
    <div>
      <p>{User?.email}</p>
      <p>Hello {User?.user_metadata.user_name}</p>
      <img
        src={User?.user_metadata.avatar_url}
        style={{ width: "100px", borderRadius: "50%" }}
      />
      {User == undefined ? (
        <button
          onClick={() => {
            Router.push("/auth");
          }}
        >
          Sign In
        </button>
      ) : (
        <button
          onClick={async () => {
            await supabase.auth.signOut();
            setUser(undefined);
          }}
        >
          Sign Out
        </button>
      )}
    </div>
  );
};

export default Home;
