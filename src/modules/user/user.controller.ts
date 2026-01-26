import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
  ParseFilePipe
} from '@nestjs/common';
import { UserService } from './user.service';

import { UpdateUserDto } from './dto/user.dto';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { ProfileDto } from './dto/profile.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

import { multerDestination, multerDiskStorage, multerFilename } from 'src/common/utils/multer.util';
import { SwaggerConsumes } from 'src/common/enums/swagger-consume.enum';
import { uploadedOptionalFiles } from 'src/common/decorators/multerUploadedFIles.decorator';

@Controller('user')
@ApiTags('user')
@ApiBearerAuth('Authorization')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Put('/profile')
  @ApiConsumes(SwaggerConsumes.MULTIPART)
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        {
          name: 'image_profile',
          maxCount: 1
        },
        { name: 'bg_image', maxCount: 1 }
      ],
      { storage: multerDiskStorage('user-profile') }
    )
  )
  changeProfile(
    @uploadedOptionalFiles()
    files: any,
    @Body()
    profileDto: ProfileDto
  ) {
    return this.userService.changeProfile(profileDto, files);
  }

  // @Post()
  // create(@Body() createUserDto: ProfileDto) {
  //   return this.userService.changeProfile(createUserDto);
  // }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get('/profile')
  findOneProfile() {
    return this.userService.findOneProfile();
  }
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.userService.findOneProfile(+id);
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
