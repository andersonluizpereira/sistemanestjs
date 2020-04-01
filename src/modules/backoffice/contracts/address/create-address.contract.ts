import { Contract } from "../contract";
import { Flunt } from "src/utils/flunt";
import { Injectable } from "@nestjs/common";
import { Address } from "src/modules/backoffice/models/address.model";



@Injectable()
export class CreateAddressContract implements Contract {
    errors: any[];
    validate(model: Address): boolean {
        const flunt = new Flunt();

        flunt.hasMinLen(model.zipCode, 8, 'CEP inválido');
        flunt.hasMinLen(model.street, 3,'Rua inválida');
        flunt.hasMinLen(model.neighborhood, 3,'Bairro inválido');
        flunt.hasMinLen(model.city, 3,'Cidade inválida');
        flunt.hasMinLen(model.state, 2,'Estado inválido');
        flunt.hasMinLen(model.country, 3,'País inválido');
        
        this.errors = flunt.errors;
        return flunt.isValid();
    }

}