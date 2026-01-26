import { ApiProperty } from '@nestjs/swagger';
import { AuthType } from '../enum/type.enum';
import { IsEnum, IsString, Length } from 'class-validator';
import { AuthMethod } from '../enum/method.enum';
export class AuthDto {
  @ApiProperty()
  @IsString()
  @Length(4, 50)
  username: string;

  @ApiProperty({ enum: AuthType, enumName: 'AuthType' }) // Ensure Swagger correctly recognizes the enum
  @IsEnum(AuthType)
  type: AuthType;

  @ApiProperty({ enum: AuthMethod, enumName: 'AuthMethod' }) // Ensure Swagger correctly recognizes the enum
  @IsEnum(AuthMethod)
  method: AuthMethod;
}

export class CheckOtpDto {
  @ApiProperty()
  @IsString()
  @Length(6, 6)
  code: string;
}
