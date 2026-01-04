import {
  BadGatewayException,
  ConflictException,
  Inject,
  Injectable,
  Scope,
  UnauthorizedException
} from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { AuthType } from './enum/type.enum';
import { AuthMethod } from './enum/method.enum';
import { isEmail, isMobilePhone } from 'class-validator';
import { InjectRepository } from '@nestjs/typeorm';

import { UserEntity } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { ProfileEntity } from '../user/entities/profile.entity';
import { AuthMessage, BadRequestMessage, NotFoundMessage } from '../../common/enums/message.enum';
import { OtpEntity } from '../user/entities/otp.entity';
import { randomInt } from 'crypto';
import { TokenService } from './token.service';
import { CookieKeys } from 'src/common/enums/cookie.enum';
import { Request, Response } from 'express';
import { AuthResponse } from './types/response';
import { REQUEST } from '@nestjs/core';

@Injectable({ scope: Scope.REQUEST }) //BARAYE DASTRESI BE REQUEST DAR KOLE INJA
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(ProfileEntity)
    private profileRepository: Repository<ProfileEntity>,
    @InjectRepository(OtpEntity)
    private otpRepository: Repository<OtpEntity>,
    private tokenService: TokenService,
    @Inject(REQUEST) private request: Request
  ) {}
  async userExistence(authDto: AuthDto, res: Response) {
    const { method, type, username } = authDto;
    let result: AuthResponse;
    switch (type) {
      case AuthType.Login:
        result = await this.login(method, username);
        return this.sendRespons(res, result);
      case AuthType.Register:
        result = await this.register(method, username);
        return this.sendRespons(res, result);

      default:
        throw new UnauthorizedException('Invalid auth type');
    }
  }

  async login(method: AuthMethod, username: string) {
    const validUsername = this.usernameValidator(method, username);
    const user: UserEntity | any = await this.checkExistUser(method, validUsername);
    if (!user) {
      throw new UnauthorizedException(NotFoundMessage.UserNotFound);
    }
    const otp = await this.sendOtp(user.id);
    const token = await this.tokenService.createOtpToken({ userId: user.id });
    return { code: otp.otp_code, token };
  }

  async register(method: AuthMethod, username: string) {
    const validUsername = this.usernameValidator(method, username);
    let user: UserEntity = await this.checkExistUser(method, validUsername);
    if (user) {
      throw new ConflictException(AuthMessage.UserAlreadyExist);
    }
    if (method === AuthMethod.Username) {
      throw new BadGatewayException(BadRequestMessage.InvalidRegisterData);
    }
    user = this.userRepository.create({
      [method]: username /*bar asas method username ro zakhire mikone */
      // username:
    });

    user = await this.userRepository.save(user);
    user.username = `m_${user.id}`;
    await this.userRepository.save(user);

    const otp = await this.sendOtp(user.id);
    const token = await this.tokenService.createOtpToken({ userId: user.id });

    return {
      code: otp.otp_code,
      token
    };
  }
  async sendOtp(userId: number) {
    const code = randomInt(100000, 999999).toString();
    const expires_at = new Date(Date.now() + 2 * 60 * 1000);
    let otp: OtpEntity | any = await this.otpRepository.findOneBy({ userId });
    let existOtp = false;

    if (otp) {
      existOtp = true;
      otp.otp_code = code;
      otp.expires_at = expires_at;
    } else {
      otp = this.otpRepository.create({
        otp_code: code,
        userId,
        expires_at
      });
    }

    // ✅ ذخیره در هر حالت
    otp = await this.otpRepository.save(otp);

    if (!existOtp) {
      await this.userRepository.update({ id: userId }, { otpId: otp.id });
    }

    if (!otp.id) {
      throw new BadGatewayException('مشکل در ذخیره کد OTP');
    }

    return otp;
  }

  async checkOtp(code: string) {
    const token = this.request.cookies?.[CookieKeys.OTP];
    if (!token) {
      throw new UnauthorizedException(AuthMessage.ExpireCode);
    }
    const { userId } = this.tokenService.verifyOtpToken(token);

    const otp = await this.otpRepository.findOneBy({ userId });
    if (!otp) {
      throw new UnauthorizedException(AuthMessage.TryAgain);
    }
    const dateNow = new Date();

    if (otp.expires_at < dateNow) {
      throw new UnauthorizedException(AuthMessage.ExpireCode);
    }
    if (otp.otp_code !== code) {
      throw new UnauthorizedException(AuthMessage.InvalidCode);
    }
    const accessToken = this.tokenService.createAccessToken({ userId });
    return { message: AuthMessage.LoginSuccess, accessToken };
  }

  async checkExistUser(method: AuthMethod, username: string) {
    let user: UserEntity | any;

    if (method === AuthMethod.Phone) {
      user = await this.userRepository.findOneBy({
        phone: username
      });
    } else if (method === AuthMethod.Email) {
      user = await this.userRepository.findOneBy({
        email: username
      });
    } else if (method === AuthMethod.Username) {
      user = await this.userRepository.findOneBy({
        username
      });
    } else {
      throw new BadGatewayException(NotFoundMessage.UserNotFound);
    }
    return user;
  }

  usernameValidator(method: AuthMethod, username) {
    switch (method) {
      case AuthMethod.Email:
        if (isEmail(username)) {
          return username;
        }
        throw new BadGatewayException('Invalid email');
      case AuthMethod.Phone:
        if (isMobilePhone(username, 'fa-IR')) {
          return username;
        }
        throw new BadGatewayException('Invalid phone');
      case AuthMethod.Username:
        return username;
      default:
        throw new BadGatewayException('Invalid method');
    }
  }
  async sendRespons(res: Response, result: AuthResponse) {
    const { token } = result;
    res.cookie(CookieKeys.OTP, token, {
      httpOnly: true,
      expires: new Date(Date.now() + 2 * 60 * 1000)
    });
    res.json({
      message: AuthMessage.OtpSendSuccess,
      code: result.code
    });
  }
  async validateAccessToken(token: string) {
    try {
      const { userId } = this.tokenService.verifyAccessToken(token);
      const user = await this.userRepository.findOneBy({ id: userId });
      if (!user) {
        throw new UnauthorizedException(AuthMessage.LoginAgain);
      }
      return user;
    } catch (error) {
      throw new UnauthorizedException('login on your account ');
    }
  }
}
