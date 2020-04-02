import { JwtService } from '@nestjs/jwt';
import { Injectable } from "@nestjs/common";
import { AccountService } from "src/modules/backoffice/services/account.service";
import { JwtPayload } from "../interfaces/jwt-payload.interface";

@Injectable()
export class AuthService {
    constructor(
        private readonly accountService: AccountService,
        private readonly jwtService: JwtService,
    ) { }

    async createToken() {
    //async createToken(document, email, image, roles: string[]) {
        // const user: JwtPayload = {
        //     document: document,
        //     email: email,
        //     image: image,
        //     roles: roles
        // };
        const user: JwtPayload = {
            document: '12345678911',
            email: 'andy2903.alp@gmail.com',
            image: '/assets/img/user.png',
            roles: ['admin']
        };
        return this.jwtService.sign(user);
    }

    async validateUser(payload: JwtPayload): Promise<any> {
        //return await this.accountService.findOneByUsername(payload.document);
        return payload;
    }
}