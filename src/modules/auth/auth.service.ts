import {
  BadGatewayException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { AuthType } from './enum/type.enum';
import { AuthMethod } from './enum/method.enum';
import { isEmail, isMobilePhone } from 'class-validator';

@Injectable()
export class AuthService {
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

  login(method: AuthMethod, username: string) {
    return this.usernameValidator(method, username);
  }

  register(method: AuthMethod, username: string) {
    return this.usernameValidator(method, username);
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
