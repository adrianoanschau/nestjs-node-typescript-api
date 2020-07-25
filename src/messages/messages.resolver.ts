import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";

@Resolver()
export class MessagesResolver {
  messagesThatReallyShouldBeInADb = [
    { id: 0, description: 'Mensagem inicial!' }
  ];

  @Query()
  messages() {
    return this.messagesThatReallyShouldBeInADb;
  }

  @Mutation()
  createMessage(@Args('description') description: string) {
    const id = this.messagesThatReallyShouldBeInADb.length;
    const newMessage = { id, description };
    this.messagesThatReallyShouldBeInADb.push(newMessage);
    return newMessage;
  }
}
