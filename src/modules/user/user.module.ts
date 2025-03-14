import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserEntity } from './entities/user.entity';
import { ProfileEntity } from './entities/profile.entity';

@Module({
  controllers: [UserController],
  providers: [UserService,UserEntity,ProfileEntity],
  
})
export class UserModule {}
