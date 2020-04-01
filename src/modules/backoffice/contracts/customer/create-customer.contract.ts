import { Contract } from "../contract";
import { Flunt } from "src/utils/flunt";
import { Injectable } from "@nestjs/common";
import { CreateCustomerDto } from "../../dtos/customer/create-customer.dto";

@Injectable()
export class CreateCustomerContract implements Contract {
    errors: any[];
    validate(model: CreateCustomerDto): boolean {
        const flunt = new Flunt();

        flunt.hasMinLen(model.name, 5, 'Nome inválido');
        flunt.isEmail(model.email, 'E-mail inválido');
        flunt.isFixedLen(model.document, 11, 'CPF inválido');
        flunt.isFixedLen(model.password, 6, 'Senhá inválido');

        this.errors = flunt.errors;
        return flunt.isValid();
    }

}