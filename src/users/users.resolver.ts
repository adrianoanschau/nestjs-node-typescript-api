import { Args, Mutation, Query, Resolver, Subscription } from "@nestjs/graphql";
import { PubSub } from "graphql-subscriptions";
import { User } from "./models/user.model";
import { CreateUserInput } from "./inputs/create-user.input";
import { Inject } from "@nestjs/common";
import { UsersService } from "./users.service";

@Resolver(of => User)
export class UsersResolver {

  constructor(
    private readonly usersService: UsersService,
    @Inject('PUB_SUB') private pubSub: PubSub,
  ) {}

  @Query(returns => [User])
  users() {
    return this.usersService.findAll();
  }

  @Query(returns => User)
  user(@Args('id') id: string) {
    return this.usersService.findById(id);
  }

  @Subscription(returns => User)
  userAdded() {
    return this.pubSub.asyncIterator('userAdded');
  }

  @Mutation(returns => User)
  async register(
    @Args('data') data: CreateUserInput,
  ) {
    const newUser = this.usersService.createUser(data);
    await this.pubSub.publish('userAdded', { userAdded: newUser })
    return newUser;
  }

}
