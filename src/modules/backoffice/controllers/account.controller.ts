import { Controller, Get, UseGuards, Post, Req, UseInterceptors, Body, HttpException, HttpStatus } from "@nestjs/common";
import { AuthService } from "src/shared/services/auth.service";
import { JwtAuthGuard } from "src/shared/guards/auth.guard";
import { request } from "https";
import { RoleInterceptor } from "src/shared/interceptors/role.interceptor";
import { Result } from "../models/result.model";
import { AuthenticateDto } from "../dtos/account/authenticate.dto";
import { AccountService } from "../services/account.service";

@Controller('/v1/accounts')
export class AccountController {
    /**
     *
     */
    constructor(private authService: AuthService,
                private accountService: AccountService) {
    }

    // Autenticar
    @Post('authenticate')
    async authenticate(@Body() model: AuthenticateDto): Promise<any> {
        const customer = await this.accountService.authenticate(model.username, model.password);

        // Caso não encontre o usuário
        if (!customer)
            throw new HttpException(new Result('Usuário ou senha inválidos', false, null, null), HttpStatus.UNAUTHORIZED);

        // Caso o usuário esteja inativo
        if (!customer.user.active)
            throw new HttpException(new Result('Usuário inativo', false, null, null), HttpStatus.UNAUTHORIZED);

        // Gera o token
        const token = await this.authService.createToken(customer.document, customer.email, '', customer.user.roles);
        return new Result(null, true, token, null);
    }
}
