
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class General {
    __typename?: 'General';
    getContractAddresses?: Nullable<Nullable<Contract>[]>;
}

export abstract class IQuery {
    __typename?: 'IQuery';

    abstract general(): Nullable<General> | Promise<Nullable<General>>;
}

export class Contract {
    __typename?: 'Contract';
    name?: Nullable<string>;
    address?: Nullable<string>;
}

type Nullable<T> = T | null;
