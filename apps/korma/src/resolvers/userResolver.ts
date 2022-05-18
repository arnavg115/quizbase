import {
  Arg,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import axios from "axios";
import { User } from "../entity/User";
import * as express from "express";
import { createAccessToken, createRefreshToken, setCookie } from "../utils";

interface Context {
  req: express.Request;
  res: express.Response;
}

@ObjectType()
class Login {
  @Field()
  accessToken: string;

  @Field(() => User)
  user: User;
}

@Resolver()
class UserResolver {
  @Query(() => String)
  hello() {
    return "hello";
  }
  @Mutation(() => Login)
  async login(
    @Arg("code") code: string,
    @Ctx() context: Context
  ): Promise<Login> {
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
    console.log(resp.data);
    if (resp.data.hasOwnProperty("error")) {
      // return response.status(401).send("UhOh");
      throw new Error("Unauthorized");
    }
    const aT = resp.data.access_token as string;

    const emails = await axios.get("https://api.github.com/user/emails", {
      headers: {
        Authorization: `token ${aT}`,
      },
    });
    const res = emails.data.filter((x) => x.primary === true);
    if (res.length < 1 || !res[0].verified) {
      // return response.status(401);

      throw new Error("Bad email");
    }

    const email = res[0].email as string;
    let user = await User.findOne({ where: { email } });
    if (!user) {
      await User.insert({ email, accessToken: aT });
      user = await User.findOne({ where: { email } });
    } else {
      user = await User.findOne({ where: { email } });
    }
    setCookie(context.res, "jd", createRefreshToken(user), true);
    return {
      user: user,
      accessToken: createAccessToken(user),
    };
  }
}

export { UserResolver };
