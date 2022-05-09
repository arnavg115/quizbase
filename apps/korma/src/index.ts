// import { AppDataSource } from "./data-source";
import { User } from "./entity/User";
import * as express from "express";
import { AppDataSource } from "./data-source";
import { ApolloServer } from "apollo-server-express";

import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/userResolver";
import * as cors from "cors";
(async () => {
  const app = express();
  app.use(
    cors({
      origin: "*",
    })
  );
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
