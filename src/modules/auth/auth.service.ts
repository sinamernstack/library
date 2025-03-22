import {
  BadGatewayException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { AuthType } from './enum/type.enum';
import { AuthMethod } from './enum/method.enum';
import { isEmail, isMobilePhone } from 'class-validator';
import { InjectRepository } from '@nestjs/typeorm';

import { UserEntity } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { ProfileEntity } from '../user/entities/profile.entity';
import { AuthMessage } from '../../common/enums/message.enum';
import { OtpEntity } from '../user/entities/otp.entity';
import { randomInt } from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(ProfileEntity)
    private profileRepository: Repository<ProfileEntity>,
    @InjectRepository(ProfileEntity)
    private otpRepository: Repository<OtpEntity>,
  ) {}
  userExistence(authDto: AuthDto) {
    const { method, type, username } = authDto;
    switch (type) {
      case AuthType.Login:
        return this.login(method, username);

      case AuthType.Register:
        return this.register(method, username);

      default:
        throw new UnauthorizedException('Invalid auth type');
    }
  }

  async login(method: AuthMethod, username: string) {
    const validUsername = this.usernameValidator(method, username);
    const user: UserEntity | any = await this.checkExistUser(
      method,
      validUsername,
    );
    if (!user) {
      throw new UnauthorizedException(AuthMessage.UserNotFound);
    }
    const otp = await this.saveOtp(user.id);
    return { code: otp.otp_code };
  }

  async register(method: AuthMethod, username: string) {
    const validUsername = this.usernameValidator(method, username);
    let user: UserEntity = (await this.checkExistUser(method, validUsername))!;
    if (user) {
      throw new ConflictException(AuthMessage.UserAlreadyExist);
    }
    user = this.userRepository.create({
      [method]: username /*bar asas method username ro zakhire mikone */,
    });
    user = await this.userRepository.save(user);
    const otp = await this.saveOtp(user.id);

    return {
      code: otp.otp_code,
    };
  }
  async saveOtp(userId: number) {
    const code = randomInt(100000, 999999);
    let otp: OtpEntity = (await this.otpRepository.findOneBy({ userId }))!;
    const expires_at = new Date(Date.now() + 2 * 60 * 1000);
    let existOtp = false;
    if (otp) {
      existOtp = true;
      otp.otp_code = code;
      otp.expires_at = expires_at;
    } else {
      await this.otpRepository.create({ userId, otp_code: code, expires_at });
    }
    otp = await this.otpRepository.save(otp);
    if (!existOtp) {
      await this.userRepository.update({ id: userId }, { otpId: otp.id });
    }
    //send [sms,email] otpcode
    return otp;
  }
  async checkExistUser(method: AuthMethod, username: string) {
    let user: UserEntity | null;

    if (method === AuthMethod.Phone) {
      user = await this.userRepository.findOneBy({
        phone: username,
      });
    } else if (method === AuthMethod.Email) {
      user = await this.userRepository.findOneBy({
        email: username,
      });
    } else if (method === AuthMethod.Username) {
      user = await this.userRepository.findOneBy({
        username,
      });
    } else {
      throw new BadGatewayException(AuthMessage.UserNotFound);
    }
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
}
