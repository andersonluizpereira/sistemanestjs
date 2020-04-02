import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "../models/user.model";
import { Model } from 'mongoose';

@Injectable()
export class AccountService {
    /**
     *
     */
    constructor(@InjectModel('User') private readonly model: Model<User>) {

    }

    async create(data: User): Promise<User> {
        const user = new this.model(data);
        return await user.save();
    }
    async findOneByUsername(userName) {
        return new User(userName, "12345678", true);
    }
}