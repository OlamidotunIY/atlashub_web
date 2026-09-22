import type { Country } from "../value-objects/country.enum";


export interface UserProps {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    country: Country;
    createdAt: string;
    updatedAt: string;
}

export class User {
    constructor(
        public readonly id: string,
        public readonly email: string,
        public readonly firstName: string,
        public readonly lastName: string,
        public readonly phoneNumber: string,
        public readonly country: Country,
        public readonly createdAt: string,
        public readonly updatedAt: string
    ) {}

    static fromJson(data: UserProps): User {
        return new User(
            data.id,
            data.email,
            data.firstName,
            data.lastName,
            data.phoneNumber,
            data.country,
            data.createdAt,
            data.updatedAt
        );
    }
}