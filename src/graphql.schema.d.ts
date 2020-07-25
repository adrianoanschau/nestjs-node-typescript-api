
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface Message {
    id: number;
    description: string;
}

export interface IQuery {
    messages(): Message[] | Promise<Message[]>;
}

export interface IMutation {
    createMessage(description: string): Message | Promise<Message>;
}
