import { NextPage } from "next";
import Router from "next/router";
import React, { useEffect } from "react";
import { supabase } from "../utils/createClient";

const auth: NextPage = () => {
  useEffect(() => {
    checker();
  }, []);
  async function checker() {
    const res = await supabase.auth.user();
    console.log(res);
    if (res) {
      Router.push("/");
    }
  }
  const signIN = async (provider: "github" | "google" | "twitter") => {
    try {
      const { user } = await supabase.auth.signIn({ provider: provider });
    } catch (err) {
      console.log(err);
    } finally {
      Router.push("/");
    }
  };
  return (
    <div>
      <button
        onClick={(e) => {
          signIN("github");
        }}
      >
        Sign in with github
      </button>
      <button
        onClick={(e) => {
          signIN("google");
        }}
      >
        Sign in with google
      </button>
      <button
        onClick={(e) => {
          signIN("twitter");
        }}
      >
        Sign in with twitter
      </button>
    </div>
  );
};

export default auth;
