import { Inject, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { ProfileDto } from './dto/profile.dto';
import { UpdateUserDto } from './dto/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { ProfileEntity } from './entities/profile.entity';
import { REQUEST } from '@nestjs/core';
import { NotFoundMessage, publicMessage } from 'src/common/enums/message.enum';
import { isDate } from 'class-validator';
import { Gender } from './enum/gender.enum';
import { ProfileImages } from './types/files.type';

@Injectable({ scope: Scope.REQUEST })
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
    @InjectRepository(ProfileEntity) private profileRepository: Repository<ProfileEntity>,
    @Inject(REQUEST) private request
  ) {}
  async changeProfile(profileDto: ProfileDto, files: ProfileImages) {
    let { image_profile, bg_image } = files;
    if (image_profile?.length > 0) {
      let [image] = image_profile;
      profileDto.image_profile = image.path;
    }
    const { id: userId, profileId } = await this.request.user;
    let profile = await this.profileRepository.findOneBy({ userId });
    if (profile) {
      if (profileDto.nick_name) profile.nick_name = profileDto.nick_name;
      if (profileDto.age) profile.age = profileDto.age;
      if (profileDto.bio) profile.bio = profileDto.bio;
      if (profileDto.bg_image) profile.bg_image = profileDto.bg_image;
      if (profileDto.gender && Object.values(Gender).includes(profileDto.gender)) profile.gender = profileDto.gender;
      if (profileDto.image_profile) profile.image_profile = profileDto.image_profile;
      if (profileDto.linkdin_profile) profile.linkdin_profile = profileDto.linkdin_profile;
      if (profileDto.birthday && isDate(new Date(profileDto.birthday))) profile.birthday = profileDto.birthday;
    } else {
      const { bio, birthday, age, bg_image, gender, image_profile, linkdin_profile, nick_name } = profileDto;
      profile = this.profileRepository.create({
        bio,
        birthday,
        age,
        bg_image,
        gender,
        image_profile,
        linkdin_profile,
        nick_name,
        userId
      });
    }
    const updatedProfile = await this.profileRepository.save(profile);

    if (!profileId) {
      await this.userRepository.update({ id: userId }, { profileId: profile.id });
    }
    return {
      message: publicMessage.Success,
      data: updatedProfile
    };
  }
  findAll() {
    return `This action returns all user`;
  }

  findOneProfile() {
    const { id } = this.request.user;
    return this.userRepository.findOne({
      where: { id },
      relations: ['profile']
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
