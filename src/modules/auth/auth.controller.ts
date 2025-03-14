import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AuthDto } from './dto/auth.dto';
import { SwaggerConsumes } from 'src/common/enums/swagger-consume.enum';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
    @Post(`user-esxistence`)
    @ApiConsumes(SwaggerConsumes.URLENCODED, SwaggerConsumes.JSON)
    @ApiBody({ type: AuthDto }) 
    userExistence(@Body() authDto: AuthDto) {
       const result =  this.authService.userExistence(authDto);
       return result
    }

  
}
