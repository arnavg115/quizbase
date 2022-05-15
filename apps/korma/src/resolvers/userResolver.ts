import {
  Arg,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import axios from "axios";
import { User } from "../entity/User";
import e = require("express");
import { createAccessToken, createRefreshToken } from "../utils";

@ObjectType()
class Login {
  @Field()
  accessToken: string;
  @Field()
  refreshToken: string;

  @Field(() => User)
  user: User;
}

@Resolver()
class UserResolver {
  @Query(() => String)
  hello() {
    return "hello";
  }
}

export { UserResolver };
