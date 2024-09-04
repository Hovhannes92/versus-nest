import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as env from 'env-var';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { AuthModule } from './auth/auth.module';
import * as dotenv from 'dotenv';
dotenv.config();


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: env.get('DATABASE_HOST').required().asString(),
      port: env.get('DATABASE_PORT').required().asPortNumber(),
      username: env.get('DATABASE_USERNAME').required().asString(),
      password: env.get('DATABASE_PASSWORD').required().asString(),
      database: env.get('DATABASE_NAME').required().asString(),
      entities: [User],
      synchronize: env.get('TYPEORM_SYNCHRONIZE').default('true').asBool(),
    }),
    TypeOrmModule.forFeature([User]),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}