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
  ParseFilePipe,
  Res,
  BadRequestException
} from '@nestjs/common';
import { UserService } from './user.service';

import { UpdateUserDto } from './dto/user.dto';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { ChangeEmailDto, ChangePhoneDto, ChangeUsernameDto, ProfileDto } from './dto/profile.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

import { multerDestination, multerDiskStorage, multerFilename } from 'src/common/utils/multer.util';
import { SwaggerConsumes } from 'src/common/enums/swagger-consume.enum';
import { uploadedOptionalFiles } from 'src/common/decorators/multerUploadedFIles.decorator';
import { publicMessage } from 'src/common/enums/message.enum';
import { CookieKeys } from 'src/common/enums/cookie.enum';
import { CheckOtpDto } from '../auth/dto/auth.dto';
import { Request, Response } from 'express';

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

  @Post('/change-email')
  @ApiConsumes(SwaggerConsumes.URLENCODED, SwaggerConsumes.JSON)
  async changeEmail(@Body() emailDto: ChangeEmailDto, @Res({ passthrough: true }) res: Response) {
    const result = await this.userService.changeEmail(emailDto.email);

    if (!result) {
      throw new BadRequestException(publicMessage.Faild);
    }

    const { message, code, token } = result;

    if (token) {
      res.cookie(CookieKeys.EmailOTP, token, {
        maxAge: 2 * 60 * 1000,
        httpOnly: true
      });
    }

    return {
      message,
      code
    };
  }

  @Post('/verify-email-otp')
  @ApiConsumes(SwaggerConsumes.URLENCODED, SwaggerConsumes.JSON)
  async verifyEmail(@Body() otpDto: CheckOtpDto) {
    return this.userService.verifyEmail(otpDto.code);
  }

  @Post('/change-phone')
  @ApiConsumes(SwaggerConsumes.URLENCODED, SwaggerConsumes.JSON)
  async changePhone(@Body() phoneDto: ChangePhoneDto, @Res({ passthrough: true }) res: Response) {
    const result = await this.userService.changePhone(phoneDto.phone);

    if (!result) {
      throw new BadRequestException(publicMessage.Faild);
    }

    const { message, code, token } = result;

    if (token) {
      res.cookie(CookieKeys.PhoneOTP, token, {
        maxAge: 2 * 60 * 1000,
        httpOnly: true
      });
    }

    return {
      message,
      code
    };
  }

  @Post('/verify-phone-otp')
  @ApiConsumes(SwaggerConsumes.URLENCODED, SwaggerConsumes.JSON)
  async verifyPhone(@Body() otpDto: CheckOtpDto) {
    return this.userService.verifyPhone(otpDto.code);
  }

  @Post('/change-username')
  @ApiConsumes(SwaggerConsumes.URLENCODED, SwaggerConsumes.JSON)
  async changeUsername(@Body() usernameDto: ChangeUsernameDto) {
    return this.userService.changeUsername(usernameDto.username);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
