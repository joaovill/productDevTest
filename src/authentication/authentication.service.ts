import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthenticationService {
    constructor(private readonly userService: UserService){}

    async validateUser(username: string, password: string){
        if(await this.userService.findByUsername(username)){
            throw new Error('achei usuário, faço o que?')
        }
        throw new Error('validate Error')
    }
}
