import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AuthDto, CheckOtpDto } from './dto/auth.dto';
import { SwaggerConsumes } from 'src/common/enums/swagger-consume.enum';

import { CookieKeys } from 'src/common/enums/cookie.enum';
import { Request, Response } from 'express';
import { AuthGuard } from './guards/auth.guard';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post(`user-esxistence`)
  @ApiConsumes(SwaggerConsumes.URLENCODED, SwaggerConsumes.JSON)
  @ApiBody({ type: AuthDto })
  async userExistence(@Body() authDto: AuthDto, @Res() res: Response) {
    return this.authService.userExistence(authDto, res);
  }

@Post(`check-otp`)
@ApiConsumes(SwaggerConsumes.URLENCODED, SwaggerConsumes.JSON)
async checkOtp(
  @Body() checkOtpDto: CheckOtpDto,
  @Res({ passthrough: true }) res: Response
) {
  const result = await this.authService.checkOtp(checkOtpDto.code);

  // ✅ Cookie (امن)
  res.cookie(CookieKeys.PhoneOTP, result.accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 15 * 60 * 1000
  });

  // ✅ Token هم برمی‌گرده برای فرانت
  return {
    message: result.message,
    accessToken: result.accessToken
  };
}


  @Get('check-login')
  @ApiBearerAuth('Authorization')
  @UseGuards(AuthGuard)
  async checkLogin(@Req() req: Request) {
    return req.user;
  }
}
