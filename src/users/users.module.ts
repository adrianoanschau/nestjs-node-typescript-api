import { Module } from "@nestjs/common";
import { PrismaModule } from "../prisma/prisma.module";
import { UsersResolver } from './users.resolver';
import { PubSub } from "graphql-subscriptions";
import { DateScalar } from "../scalar/date.scalar";
import { UsersService } from './users.service';

@Module({
  imports: [PrismaModule],
  providers: [
    {
      provide: 'PUB_SUB',
      useValue: new PubSub(),
    },
    UsersResolver,
    DateScalar,
    UsersService,
  ],
  exports: [UsersService],
})
export class UsersModule {}
