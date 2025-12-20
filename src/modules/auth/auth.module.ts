import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserEntity } from '../user/entities/user.entity';
import { ProfileEntity } from '../user/entities/profile.entity';
import { UserController } from '../user/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { OtpEntity } from '../user/entities/otp.entity';
import { JwtService } from '@nestjs/jwt';
import { TokenService } from './token.service';
import { AuthGuard } from './guards/auth.guard';

@Module({
  controllers: [AuthController,UserController],
  providers: [AuthService,UserService,TokenService,JwtService,AuthGuard],
  imports: [
    UserModule,
    TypeOrmModule.forFeature([UserEntity, ProfileEntity, OtpEntity])
  ],
})
export class AuthModule {}
