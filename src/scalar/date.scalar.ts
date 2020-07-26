import { CustomScalar, Scalar } from "@nestjs/graphql";
import { Kind, ValueNode } from "graphql";
import { Maybe } from "graphql/jsutils/Maybe";

@Scalar('Date', type => Date)
export class DateScalar implements  CustomScalar<string, Date> {
  description = 'Date custom scalar type';

  parseLiteral(valueNode: ValueNode): Maybe<Date> {
    if (valueNode.kind === Kind.STRING) {
      return new Date(valueNode.value);
    }
    return null;
  }

  parseValue(value: string): Maybe<Date> {
    return new Date(value);
  }

  serialize(value: Date): Maybe<string> {
    return value.toISOString();
  }
}