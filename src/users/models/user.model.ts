import { Field, ObjectType } from "@nestjs/graphql";
import { isUUID } from "@nestjs/common/utils/is-uuid";

@ObjectType()
export class User {
  @Field(type => isUUID)
  id: string;

  @Field()
  name: string

  @Field()
  email: string

  @Field({ nullable: true })
  password: string

  @Field()
  createdAt: Date

  @Field()
  updatedAt: Date

}
