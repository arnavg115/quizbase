import "dotenv/config";
// import { AppDataSource } from "./data-source";
import { User } from "./entity/User";
import * as express from "express";
import { AppDataSource } from "./data-source";
import { ApolloServer } from "apollo-server-express";
import { grabParams } from "utils";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/userResolver";
import * as cors from "cors";
import axios from "axios";
import { createAccessToken, createRefreshToken } from "./utils";
(async () => {
  const app = express();

  app.use(
    cors({
      origin: "*",
      credentials: true,
    })
  );
  app.get("/login", async (req, response) => {
    // return response.send(req.url.split("?")[1]);

    const code = req.query.code as any;
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
      console.log("error");
      console.log(req.query);

      return response.status(401).send("UhOh");
      // throw new Error("Unauthorized");
    }
    const aT = resp.data.access_token as string;

    const emails = await axios.get("https://api.github.com/user/emails", {
      headers: {
        Authorization: `token ${aT}`,
      },
    });
    const res = emails.data.filter((x) => x.primary === true);
    if (res.length < 1 || !res[0].verified) {
      return response.status(401);

      // throw new Error("Bad email");
    }

    const email = res[0].email as string;
    let user = await User.findOne({ where: { email } });
    if (!user) {
      await User.insert({ email, accessToken: aT });
      user = await User.findOne({ where: { email } });
    } else {
      user = await User.findOne({ where: { email } });
    }
    return response.status(200).send({
      user: user,
      accessToken: createAccessToken(user),
      refreshToken: createRefreshToken(user),
    });
  });
  await AppDataSource.initialize();

  // const httpServer = http.createServer(app);
  const server = new ApolloServer({
    schema: await buildSchema({ resolvers: [UserResolver] }),
  });
  await server.start();
  server.applyMiddleware({ app, cors: false });

  app.listen(8000, () => {
    console.log("Running ");
  });
})();
// const app = express();
// app.use(cors());
// app.get("/hello", (req, res) => {
//   res.send("Hello");
// });
// app.listen(8000, () => {
//   console.log("Port 800");
// });

// AppDataSource.initialize()
//   .then(async () => {
//     console.log("Inserting a new user into the database...");
//     const user = new User();
//     user.email = "Timber";
//     await AppDataSource.manager.save(user);
//     console.log("Saved a new user with id: " + user.id);

//     console.log("Loading users from the database...");
//     const users = await AppDataSource.manager.find(User);
//     console.log("Loaded users: ", users);

//     console.log(
//       "Here you can setup and run express / fastify / any other framework."
//     );
//   })
//   .catch((error) => console.log(error));
