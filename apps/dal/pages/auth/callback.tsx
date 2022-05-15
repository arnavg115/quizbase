import { GetServerSideProps } from "next";
import React, { useEffect } from "react";
import { grabParams } from "utils";
import axios from "axios";
const Callback = ({ params }: { params: { code: string } }) => {
  useEffect(() => {
    auth();
  }, []);
  async function auth() {
    const resp = await axios.get("/api/auth/callback", {
      params: {
        code: params.code,
      },
    });
    console.log(resp.data);
  }

  return <div>{params.code}</div>;
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  return {
    props: {
      params: grabParams(req.url!.split("?")[1]),
    },
  };
};

export default Callback;
