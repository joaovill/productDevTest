import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthenticationService {
    validateUser(username, password){
        return 'texto teste'
    }
    login(){
        return 'texto teste'
    }
}
