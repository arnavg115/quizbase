import React from "react";

const Login = () => {
  return (
    <div>
      <button
        onClick={() => {
          location.href = `https://github.com/login/oauth/authorize?scope=user:email&client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}`;
        }}
      >
        Login with Github
      </button>
    </div>
  );
};

export default Login;
