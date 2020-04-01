import { Controller, Post, Param, Body, UseInterceptors, HttpException, HttpStatus } from "@nestjs/common";
import { Result } from "../models/result.model";
import { ValidatorInterceptor } from "src/interceptors/validator.inteceptor";
import { Address } from "../models/address.model";
import { CreateAddressContract } from "../contracts/address/create-address.contract";
import { AddressService } from "../services/address.service";
import { AddressType } from "../enums/address-type.enum";

@Controller('v1/addresses')
export class AddressController {

    /**
     *
     */
    constructor(private readonly service: AddressService) {
 
    }

    @Post(':document/billing')
    @UseInterceptors(new ValidatorInterceptor(new CreateAddressContract()))
    async addBillingAddress(@Param('document') document, @Body() model: Address) {
        try {
            const res = await this.service.create(document,model, AddressType.Billing);
            return new Result(null, true, res, null);
        } catch (error) {
            throw new HttpException(new Result('Não foi possível realizar o seu endereço',false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

    @Post(':document/shipping')
    @UseInterceptors(new ValidatorInterceptor(new CreateAddressContract()))
    async addShippingAddress(@Param('document') document, @Body() model: Address) {
        try {
            const res = await this.service.create(document,model, AddressType.Shipping);
            return new Result(null, true, res, null);
        } catch (error) {
            throw new HttpException(new Result('Não foi possível realizar o seu endereço de pagamento',false, null, error), HttpStatus.BAD_REQUEST);
        }
    }
}