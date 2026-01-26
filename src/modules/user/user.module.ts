import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserEntity } from './entities/user.entity';
import { ProfileEntity } from './entities/profile.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OtpEntity } from './entities/otp.entity';
import { AuthService } from '../auth/auth.service';
import { TokenService } from '../auth/token.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [UserController],
  imports: [TypeOrmModule.forFeature([UserEntity, ProfileEntity, OtpEntity])],
  providers: [UserService, AuthService, TokenService, JwtService],
  exports: [UserService, TypeOrmModule]
})
export class UserModule {}
