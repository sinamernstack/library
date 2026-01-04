import { Injectable } from '@nestjs/common';
import {  ProfileDto } from './dto/profile.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  changeProfile(profileDto: ProfileDto) {}

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
