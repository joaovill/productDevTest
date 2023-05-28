import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt'
import { User } from 'src/user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UserPayload } from './models/userPayload';
import { AccessToken } from './models/accessToken';

@Injectable()
export class AuthenticationService {
    constructor(private readonly userService: UserService, private readonly jwtService: JwtService){}

    async validateUser(username: string, password: string){
        const user = await this.userService.findByUsername(username)

        if(user){
            const validPassword = await bcrypt.compare(password, user.password)
            
            if(validPassword){
                return {
                    ...user,
                    password: undefined
                }
            }
        }
        throw new Error('Username or password invalid')
    }

    login(user: User): AccessToken{
        //JWT
        const userPayload: UserPayload = {
            sub: user.id,
            username: user.username,
            name: user.name
        }
        
        const jwtToken = this.jwtService.sign(userPayload)

        return {
            access_token: jwtToken
        }
    }

    async register(user: User): Promise<AccessToken>{
        return this.login( await this.userService.create(user))
    }
}
