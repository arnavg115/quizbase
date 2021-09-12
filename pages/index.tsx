import { User } from "@supabase/gotrue-js";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { supabase } from "../utils/createClient";
import { v4 } from "uuid";
import Router from "next/router";
const Home: NextPage = () => {
  const [User, setUser] = useState<User>();
  const [deck, setDeck] = useState("");
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
      {User ? (
        <div>
          <div style={{ display: "flex" }}>
            <p>Signed in as {User.email}</p>

            <img
              src={User.user_metadata.avatar_url}
              alt="profile"
              style={{
                width: "50px",
                borderRadius: "50%",
                marginLeft: "10px",
                marginRight: "10px",
              }}
            />
            <button
              onClick={async () => {
                await supabase.auth.signOut();
              }}
            >
              Logout
            </button>
          </div>
          <input
            placeholder="Deck Name"
            value={deck}
            onChange={(e) => {
              setDeck(e.target.value);
            }}
          />
          <button
            onClick={async () => {
              // console.log(User.id);
              const { data, error } = await supabase.from("decks").insert([
                {
                  id: v4(),
                  name: deck,
                  uid: User.id,
                },
              ]);
              console.log(data);
              setDeck("");
              fetchThem();
            }}
          >
            add
          </button>
        </div>
      ) : (
        <div>
          <p>Sign In</p>
          <button
            onClick={() => {
              Router.push("/auth");
            }}
          >
            Go to login
          </button>
        </div>
      )}
      <h1>Decks</h1>
      {loads.map((x) => {
        return (
          <div key={x.id}>
            <p>{x.name}</p>
            <div>{x.cards ? x.cards.map((y: any) => <p>{y}</p>) : null}</div>
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
