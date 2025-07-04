import { BaseModel } from 'src/common/entities/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { UserModel } from './users.entity';
@Entity()
export class UserFollowersModel extends BaseModel {
  @ManyToOne(
    () => UserModel,
    (user) => user.followers,
  )
  follower: UserModel;

  @ManyToOne(
    () => UserModel,
    (user) => user.followees,
  )
  followee: UserModel;

  @Column({
    default: false,
  })
  isConfirmed: boolean;
}
