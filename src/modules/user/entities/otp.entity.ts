import { BaseEntity } from 'src/common/abstracts/base.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { UserEntity } from './user.entity';
import { EntityName } from 'src/common/enums/entity.enum';

@Entity(EntityName.Otp)
export class OtpEntity extends BaseEntity {
  @Column()
  phone_number: string;

  @Column()
  otp_code: number;

  @Column({ type: 'timestamp' })
  expires_at: Date;

  // ذخیره ID مربوط به User
  @Column({ nullable: true })
  userId: number;

  @OneToOne(() => UserEntity, (user) => user.otp, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' }) // نام فیلد کلید خارجی در دیتابیس
  user: UserEntity;
}
