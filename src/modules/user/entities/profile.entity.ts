import { BaseEntity } from 'src/common/abstracts/base.entity';
import { Column } from 'typeorm';

export class ProfileEntity extends BaseEntity {
  @Column({ nullable: true })
  nick_name: string;
  @Column({ nullable: true })
  age: number;
  @Column({ nullable: true })
  bio: string;
  @Column({ nullable: true })
  image_profile: string;
  @Column({ nullable: true })
  bg_image: string;
  @Column({ nullable: true })
  birthday: Date;
  @Column({ nullable: true })
  linkdin_profile: string;
  @Column({ nullable: true })
  gender: string;
}
