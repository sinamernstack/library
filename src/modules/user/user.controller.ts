import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { UserService } from './user.service';

import { UpdateUserDto } from './dto/user.dto';
import { ApiTags } from '@nestjs/swagger';
import { ProfileDto } from './dto/profile.dto';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Put('/profile')
  changeProfile(@Body() profileDto: ProfileDto) {
     this.userService.changeProfile(profileDto);
  }

  @Post()
  create(@Body() createUserDto: ProfileDto) {
    return this.userService.changeProfile(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
