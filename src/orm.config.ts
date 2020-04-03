import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const commonConf = {
  SYNCRONIZE: false,
  ENTITIES: [__dirname + '/**/*.entity{.ts,.js}'],
  MIGRATIONS: [__dirname + '/migrations/**/*{.ts,.js}'],
  CLI: {
    migrationsDir: 'src/migrations'
  },
  MIGRATIONS_RUN: true
};

let ormconfig: TypeOrmModuleOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'password',
    database: 'store',
    entities: commonConf.ENTITIES,
    synchronize: true,
//   name: 'default',
//   type: 'sqlite',
//   database: '../target/sqlite-dev-db.sql',
//   logging: true,
//   synchronize: true,
//   entities: commonConf.ENTITIES,
  //migrations: commonConf.MIGRATIONS,
  //cli: commonConf.CLI,
  //migrationsRun: commonConf.MIGRATIONS_RUN
};

if (process.env.NODE_ENV === 'prod') {
  ormconfig = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'password',
    database: 'store',
    entities: commonConf.ENTITIES,
    synchronize: true,
  };
}

export { ormconfig };
