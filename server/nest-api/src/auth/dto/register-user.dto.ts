import { IsEmail, IsString, MinLength } from 'class-validator';
import { Match } from 'src/common/decorator/match.decorator';
import { GithubBasicInfoUserDto } from './register-github.dto';

export class PickRegisterUserDto {
  @IsString()
  devName: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}

export class RegisterUserDto extends PickRegisterUserDto {
  @IsString()
  @Match('password', {
    message: '비밀번호와 확인 비밀번호가 일치하지 않습니다.',
  })
  passwordConfirm: string;
}

export class RegisterGithubUserDto extends GithubBasicInfoUserDto {}
