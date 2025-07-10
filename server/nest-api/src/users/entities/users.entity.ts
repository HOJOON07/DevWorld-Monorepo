import { Exclude } from 'class-transformer';
import { IsEmail, IsString, Length } from 'class-validator';
import { CommentsModel } from 'src/articles/comments/entities/comment.entity';
import { ArticlesModel } from 'src/articles/entities/articles.entity';
import { BaseModel } from 'src/common/entities/base.entity';
import { EmailValidationMessage } from 'src/common/validation-message/email-validation.message';
import { lengthValidationMessage } from 'src/common/validation-message/length-validation.message';
import { stringValidationMessage } from 'src/common/validation-message/string-validation.message';
import { Column, Entity, JoinTable, OneToMany } from 'typeorm';
import { RolesEnum } from '../const/roles.const';
import { UserFollowersModel } from './user-followers.entity';

@Entity()
export class UserModel extends BaseModel {
  @Column({
    unique: true,
  })
  @IsEmail({}, { message: EmailValidationMessage })
  email: string;

  @Column({ nullable: true })
  @IsString({ message: stringValidationMessage })
  @Length(8, 16, {
    message: lengthValidationMessage,
  })
  @Exclude({
    toPlainOnly: true,
  })
  password: string;

  @Column({
    length: 15,
    unique: true,
    nullable: true,
  })
  @IsString()
  @Length(2, 15, { message: lengthValidationMessage })
  devName: string;

  @Column({
    type: 'enum',
    enum: Object.values(RolesEnum),
    default: RolesEnum.USER,
  })
  role: RolesEnum;

  @OneToMany(
    () => ArticlesModel,
    (articles) => articles.author,
  )
  @Exclude() // 로그인 응답에서 제외
  articles: ArticlesModel[];

  @Column({
    nullable: true,
  })
  position: string;

  @Column({
    nullable: true,
  })
  bio: string;

  @Column({
    nullable: true,
  })
  location: string;

  @Column({
    nullable: true,
  })
  github: string;

  @Column({
    nullable: true,
  })
  linkedin: string;

  @Column({
    nullable: true,
  })
  instagram: string;

  @Column({
    nullable: true,
  })
  socialEtc: string;

  @Column({
    nullable: true,
  })
  company: string;

  @Column({
    nullable: true,
    type: 'jsonb',
  })
  readme: string;

  // 존재하지 않는 프로퍼티를 만들어서 보내주고 싶다면 expose를 사용해서 보내줄 수 있다.
  // @Expose()
  // get devNameAndEmail() {
  //   return this.devName + '/' + this.email;
  // }

  @OneToMany(
    () => CommentsModel,
    (comments) => comments.author,
  )
  @Exclude() // 로그인 응답에서 제외
  articlesComments: CommentsModel[];
  // 내가 팔로우 하는 사람
  @OneToMany(
    () => UserFollowersModel,
    (ufm) => ufm.follower,
  )
  @JoinTable()
  @Exclude() // 로그인 응답에서 제외
  followers: UserFollowersModel[];

  // 나를 팔로우 하는 사람
  @OneToMany(
    () => UserFollowersModel,
    (ufm) => ufm.followee,
  )
  @Exclude() // 로그인 응답에서 제외
  followees: UserFollowersModel[];

  @Column({
    default: 0,
  })
  followerCount: number;

  @Column({
    default: 0,
  })
  followeeCount: number;

  @Column({
    nullable: true,
  })
  image: string;
}
