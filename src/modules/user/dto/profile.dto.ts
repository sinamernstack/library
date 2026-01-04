import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsInt,
  Min,
  Max,
  IsDateString,
  IsEnum,
  IsUrl
} from 'class-validator';

export enum GenderEnum {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other'
}

export class ProfileDto {
  @ApiPropertyOptional({ example: 'john_doe' })
  @IsOptional()
  @IsString()
  nick_name?: string;

  @ApiPropertyOptional({ example: 25, nullable: true })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(120)
  age?: number;

  @ApiPropertyOptional({ example: 'Backend developer', nullable: true })
  @IsOptional()
  @IsString()
  bio?: string;
  

  @ApiPropertyOptional({
    example: 'https://example.com/profile.jpg',
    nullable: true,
    format:"binary"
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
    enum: GenderEnum,
    nullable: true
  })
  @IsOptional()
  @IsEnum(GenderEnum)
  gender?: GenderEnum;
}
