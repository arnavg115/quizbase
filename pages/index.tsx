import { User } from "@supabase/gotrue-js";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { supabase } from "../utils/createClient";

import { NavBar } from "../components/NavBar";
const Home: NextPage = () => {
  const [User, setUser] = useState<User>();
  const [loads, setLoads] = useState<any[]>([]);
  useEffect(() => {
    loadUser();
  }, []);
  const loadUser = async () => {
    const fo = await supabase.auth.user();
    if (fo) {
      const { data } = await supabase
        .from("decks")
        .select("*")
        .eq("uid", fo.id);
      setLoads(data!);
    }
    setUser(fo!);
    const {} = await supabase.auth.onAuthStateChange(async () => {
      const user = await supabase.auth.user();
      setUser(user!);
      await fetchThem();
    });
  };
  const fetchThem = async () => {
    console.log(User);
    if (User) {
      const { data } = await supabase
        .from("decks")
        .select("*")
        .eq("uid", User.id);
      setLoads(data!);
    }
  };
  return (
    <div>
      <h1>Decks</h1>
      {loads.map((x) => {
        return (
          <div key={x.id}>
            <p>{x.name}</p>
            <div>
              {x.cards
                ? x.cards.map((y: any) => <p key={Math.random()}>{y}</p>)
                : null}
            </div>
            <button
              onClick={async () => {
                await supabase.from("decks").delete().eq("id", x.id!);
                fetchThem();
              }}
            >
              Delete
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
