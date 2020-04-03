import { Module } from '@nestjs/common';
import { BackofficeModule } from './modules/backoffice/backoffice.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoreModule } from './modules/store/store.module';
import env from './shared/config/env';
import { AgendaModule } from './modules/agenda/agenda.module';
import { ormconfig } from './orm.config';
@Module({
  imports: [
    MongooseModule.forRoot(env.mongoUrl),
    TypeOrmModule.forRoot(ormconfig),
    BackofficeModule,
    StoreModule
    //AgendaModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
