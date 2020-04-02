import { Controller, Get, Post, Put, Delete, Param, Body, UseInterceptors, HttpException, HttpStatus } from "@nestjs/common";
import { Customer } from "../models/customer.model";
import { Result } from "../models/result.model";
import { ValidatorInterceptor } from "src/interceptors/validator.inteceptor";
import { CreateCustomerDto } from "../dtos/customer/create-customer.dto";
import { AccountService } from "../services/account.service";
import { User } from "../models/user.model";
import { CustomerService } from "../services/customer.service";
import { CreateCustomerContract } from "../contracts/customer/create-customer.contract";
import { QueryDto } from "../dtos/query.dto";
import { UpdateCustomerDto } from "../dtos/customer/update-customer.dto";
import { UpdateCustomerContract } from "../contracts/customer/update-customer.contract";
import { QueryContract } from "../contracts/query.contract";

@Controller('v1/customers')
export class CustomerController {

    /**
     *
     */
    constructor(private readonly accountService: AccountService,
                private readonly customerService: CustomerService) {
 
    }

    @Get()
    async getAll() {
        const customers = await this.customerService.findAll()
        return new Result(null, true, customers, null)
    }
    @Get(':document')
    async getById(@Param('document') document) {
        const customer = await this.customerService.find(document)
        return new Result(null, true, customer, null)
    }
    @Post()
    @UseInterceptors(new ValidatorInterceptor(new CreateCustomerContract()))
    async post(@Body() model: CreateCustomerDto) {
        try {
            const user = await this.accountService.create(new User(model.document, model.password, false, ['user']));
            const customer = new Customer(model.name, model.document, model.email, [], null, null, null, user);
            const res = await this.customerService.create(customer);
            return new Result('Customer Created', true, res, null)   
        } catch (error) {
            throw new HttpException(new Result('Não foi possível realizar o seu cadastro',false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

    @Put(':document')
    @UseInterceptors(new ValidatorInterceptor(new UpdateCustomerContract()))
    async put(@Param('document') document, @Body() model: UpdateCustomerDto) {
        try {
            await this.customerService.update(document,model);
            return new Result('Customer Created', true, model, null)   
        } catch (error) {
            throw new HttpException(new Result('Não foi possível atualizar o seu cadastro',false, null, error), HttpStatus.BAD_REQUEST);
        }
    }
    @Delete(':document')
    delete() {
        return new Result('Customer Removed', true, null, null)
    }

    @Post('query')
    @UseInterceptors(new ValidatorInterceptor(new QueryContract()))
    async query(@Body() model: QueryDto) {
        const customers = await this.customerService.query(model);
        return new Result(null, true, customers, null);
    }

}