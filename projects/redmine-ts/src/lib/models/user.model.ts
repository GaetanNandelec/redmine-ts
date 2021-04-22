import { CustomFieldSimplified } from "./customfield.model";
import { ResultWrapper } from "./pagination.model";


export interface UserResultWrapper extends ResultWrapper{

    users:User[]; 
}

export interface User{
    id: number;
    login: string;
    admin: boolean;
    firstname: string;
    lastname: string;
    mail: string;
    created_on: Date;
    updated_on: Date;
    last_login_on: Date;
    passwd_changed_on: Date;
    twofa_scheme: string;
    custom_fields: CustomFieldSimplified[];
}

export interface UserAccount{
    id: number;
    login: string;
    admin: boolean;
    firstname: string;
    lastname: string;
    mail: string;
    created_on: Date;
    last_login_on: Date;
    api_key: string;
    custom_fields: CustomFieldSimplified[];
}

export interface UserSimplified {
    id: number;
    name: string;
}

export interface UserChangeRequest {
    login: string;
    password?: string;
    firstname: string;
    lastname: string;
    mail: string;

    //TODO check below
    auth_source_id?: number;
    mail_notification?: string;
    must_change_passwd?: boolean;
    generate_password?: boolean;
}
