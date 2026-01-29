import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { isJWT } from 'class-validator';
import { Request } from 'express';
import { AuthService } from '../auth.service';
import { AuthMessage } from 'src/common/enums/message.enum';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}
  async canActivate(context: ExecutionContext) {
    const httpContext = context.switchToHttp();
    const request: Request = httpContext.getRequest<Request>();
    const token = this.extractToken(request);
    request.user = await this.authService.validateAccessToken(token);
    return true;
  }
protected extractToken(request: Request) {
  // 1️⃣ اول از Cookie
  const cookieToken = request.cookies?.access_token;
  if (cookieToken && isJWT(cookieToken)) {
    return cookieToken;
  }

  // 2️⃣ fallback به Authorization Header
  const { authorization } = request.headers;
  if (!authorization || authorization.trim() === '') {
    throw new UnauthorizedException(AuthMessage.LoginOnYourAccount);
  }

  const [bearer, token] = authorization.split(' ');
  if (bearer?.toLowerCase() !== 'bearer' || !token || !isJWT(token)) {
    throw new UnauthorizedException(AuthMessage.LoginOnYourAccount);
  }

  return token;
}

}
