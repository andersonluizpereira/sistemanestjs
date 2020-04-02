export default {
    mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/PetShop',
    port: process.env.PORT || 3000,
    jwtSecret: process.env.JWT_SECRET || 'tj67O==5H',
    salt_key: process.env.SALT_KEY || "0f21a1d95566408eb53ed99e3936359f",
    typeOrm:{
            type: process.env.TYPE ||  'mysql',
            host: process.env.HOST || 'localhost',
            port: process.env.PORT || 3306,
            username: process.env.USER_NAME || 'root',
            password:  process.env.USER_PASSWORD || 'password',
            database:   process.env.DATA_BASE || 'store',
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            synchronize:   process.env.SYNCHRONIZE || true,
          }
    }