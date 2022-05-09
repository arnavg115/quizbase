import { Mutation, Query, Resolver } from "type-graphql";

@Resolver()
class UserResolver {
  @Query(() => String)
  hello() {
    return "hello";
  }
  @Mutation()
  register() {}
}

export { UserResolver };
