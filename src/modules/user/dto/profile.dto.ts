import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsDateString, IsEnum, IsUrl, IsEmail, IsPhoneNumber, IsMobilePhone } from 'class-validator';
import { Gender } from '../enum/gender.enum';
import { ValidationMessage } from 'src/common/enums/message.enum';

export class ProfileDto {
  @ApiPropertyOptional({ example: 'john_doe' })
  @IsOptional()
  @IsString()
  nick_name?: string;

  @ApiPropertyOptional({ example: 25, nullable: true })
  @IsOptional()
  age?: number;

  @ApiPropertyOptional({ example: 'Backend developer', nullable: true })
  @IsOptional()
  @IsString()
  bio?: string;

  @ApiPropertyOptional({
    example: 'https://example.com/profile.jpg',
    nullable: true,
    format: 'binary'
  })
  @IsOptional()
  @IsString()
  image_profile?: string;

  @ApiPropertyOptional({
    example: 'https://example.com/bg.jpg',
    nullable: true
  })
  @IsOptional()
  @IsString()
  bg_image?: string;

  @ApiPropertyOptional({
    example: '1998-05-12',
    nullable: true,
    description: 'ISO date string'
  })
  @IsOptional()
  @IsDateString()
  birthday?: Date;

  @ApiPropertyOptional({
    example: 'https://linkedin.com/in/username',
    nullable: true
  })
  @IsOptional()
  @IsUrl()
  linkdin_profile?: string;

  @ApiPropertyOptional({
    enum: Gender,
    nullable: true
  })
  @IsOptional()
  @IsEnum(Gender)
  gender?: Gender;
}
export class ChangeEmailDto {
  @ApiProperty()
  @IsEmail(undefined, {message: ValidationMessage.InvalidEmailFormat })
  email: string;    
}
export class ChangePhoneDto {
  @ApiProperty()
  @IsMobilePhone('fa-IR', undefined, { message: ValidationMessage.InvalidPhoneFormat })
  email: string;
}
