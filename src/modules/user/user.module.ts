import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserEntity } from './entities/user.entity';
import { ProfileEntity } from './entities/profile.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OtpEntity } from './entities/otp.entity';

@Module({
  controllers: [UserController],
  imports:[TypeOrmModule.forFeature([UserEntity,ProfileEntity,OtpEntity])],
  providers: [UserService],
  exports:[UserService,TypeOrmModule]
  
})
export class UserModule {}
