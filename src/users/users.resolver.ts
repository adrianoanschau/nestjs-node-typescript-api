import { Args, Mutation, Query, Resolver, Subscription } from "@nestjs/graphql";
import { PubSub } from "graphql-subscriptions";
import { PrismaService } from "../prisma/prisma.service";
import { User } from "./models/user.model";
import { CreateUserInput } from "./inputs/create-user.input";
import { Inject } from "@nestjs/common";

@Resolver(of => User)
export class UsersResolver {

  constructor(
    private readonly prismaService: PrismaService,
    @Inject('PUB_SUB') private pubSub: PubSub,
  ) {}

  @Query(returns => [User])
  users() {
    return this.prismaService.user.findMany();
  }

  @Mutation(returns => User)
  async createUser(
    @Args('data') data: CreateUserInput,
  ) {
    const newUser = this.prismaService.user.create({
      data,
    });
    await this.pubSub.publish('userAdded', { userAdded: newUser })
    return newUser;
  }

  @Subscription(returns => User)
  userAdded() {
    return this.pubSub.asyncIterator('userAdded');
  }

}
