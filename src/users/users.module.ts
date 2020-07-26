import { Module } from "@nestjs/common";
import { PrismaModule } from "../prisma/prisma.module";
import { UsersResolver } from './users.resolver';
import { PubSub } from "graphql-subscriptions";
import { DateScalar } from "../scalar/date.scalar";

@Module({
  imports: [PrismaModule],
  providers: [
    {
      provide: 'PUB_SUB',
      useValue: new PubSub(),
    },
    UsersResolver,
    DateScalar,
  ],
})
export class UsersModule {}
