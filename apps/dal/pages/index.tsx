import { Button } from "ui";

export default function Web() {
  return (
    <div>
      <h1>Web</h1>
      <button
        onClick={() => {
          location.href = `https://github.com/login/oauth/authorize?scope=user:email&client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}`;
        }}
      >
        Login
      </button>
    </div>
  );
}
