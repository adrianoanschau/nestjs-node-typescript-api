
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

export interface AccessToken {
    access_token: string;
    refresh_token: string;
    expires_in: number;
}

export interface IQuery {
    me(): User | Promise<User>;
    user(id: string): User | Promise<User>;
    users(): User[] | Promise<User[]>;
}

export interface IMutation {
    login(email: string): AccessToken | Promise<AccessToken>;
    refreshToken(): AccessToken | Promise<AccessToken>;
    register(data: CreateUser): User | Promise<User>;
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
