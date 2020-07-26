
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface CreateUser {
    name: string;
    email: string;
    password?: string;
}

export interface IQuery {
    users(): User[] | Promise<User[]>;
}

export interface IMutation {
    createUser(data: CreateUser): User | Promise<User>;
}

export interface ISubscription {
    userAdded(): User | Promise<User>;
}

export interface User {
    id: string;
    name: string;
    email: string;
    password?: string;
    createdAt: Date;
    updatedAt: Date;
}
