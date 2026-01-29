import { BaseEntity } from 'src/common/abstracts/base.entity';
import { EntityName } from 'src/common/enums/entity.enum';
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, UpdateDateColumn } from 'typeorm';
import { OtpEntity } from './otp.entity';
import { ProfileEntity } from './profile.entity';

@Entity(EntityName.User)
export class UserEntity extends BaseEntity {
  @Column({ unique: true, nullable: true })
  username: string;

  @Column({ unique: true, nullable: true })
  phone: string;

  

  @Column({ unique: true, nullable: true })
  email: string;

  @Column({  nullable: true })
  newEmail: string;

  @Column({ default: false, nullable: true })
  verifyEmail: boolean;
  
  @Column({ default: false, nullable: true })
  verifyPhone: boolean;

  // ذخیره ID مربوط به OTP
  @Column({ nullable: true })
  otpId: number;

  @OneToOne(() => OtpEntity, otp => otp.user, { nullable: true, cascade: true })
  @JoinColumn({ name: 'otpId' }) // نام فیلد کلید خارجی در دیتابیس
  otp: OtpEntity;

  @Column({ nullable: true })
  profileId: number;

  @OneToOne(() => ProfileEntity, profile => profile.user, { cascade: true })
  @JoinColumn({ name: 'profileId' })
  profile: ProfileEntity;
}
