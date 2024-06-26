import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './users.model';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JWTStrategy } from './strategies/jwt.strategy';

@Module({
  imports : [
    ConfigModule,
    MongooseModule.forFeature([
    {
      name: User.name,
      schema: UserSchema
    }
  ]),
  JwtModule.registerAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      return {
        secret: configService.get('JWT_SECRET'),
      };
    },
  }),
  PassportModule],
  controllers: [UsersController],
  providers: [UsersService, JWTStrategy]
})
export class UsersModule {}
