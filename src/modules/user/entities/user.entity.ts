import { BaseEntity } from 'src/common/abstracts/base.entity';
import { EntityName } from 'src/common/enums/entity.enum';
import { Column, Entity } from 'typeorm';

@Entity(EntityName.User)
export class UserEntity extends BaseEntity {
  @Column({ unique: true, nullable: false })
  username: string;
  @Column({ unique: true, nullable: false })
  phone: string;
  @Column({ unique: true, nullable: false })
  email: string;
}
