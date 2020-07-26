import { Field, Int, ObjectType } from "@nestjs/graphql";
import { User } from "../../users/models/user.model";

@ObjectType()
export class RefreshToken {
  @Field(type => Int)
  id: number

  @Field()
  token: string

  @Field()
  user: User
}
