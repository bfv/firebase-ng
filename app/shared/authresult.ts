
export enum LoginFailedType {
    account,
    password,
    noCredentials,
    unknown
}

export class AuthResult {

    public ok: boolean = true;
    public error: LoginFailedType;


    constructor (errorType?: LoginFailedType) {
        
        if (errorType) {
            this.error = errorType;
            this.ok = false;
        }

    }
}