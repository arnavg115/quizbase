import { Arg, Mutation, Query, Resolver } from "type-graphql";
import axios from "axios";
@Resolver()
class UserResolver {
  @Query(() => String)
  hello() {
    return "hello";
  }
  @Mutation(() => String)
  async login(@Arg("code") code: string) {
    const resp = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      },
      {
        headers: {
          Accept: "application/json",
        },
      }
    );
    if (resp.data.hasOwnProperty("error")) {
      console.log("error");
      throw new Error("Unauthorized");
    }
    const aT = resp.data.access_token as string;

    const emails = await axios.get("https://api.github.com/user/emails", {
      headers: {
        Authorization: `token ${aT}`,
      },
    });
    const res = emails.data.filter((x) => x.primary === true);

    return "";
  }
}

export { UserResolver };
