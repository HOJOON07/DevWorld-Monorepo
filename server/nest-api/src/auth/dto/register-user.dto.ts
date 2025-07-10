import { IsEmail, IsString, MinLength } from 'class-validator';
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
  passwordConfirm: string;
}

export class RegisterGithubUserDto extends GithubBasicInfoUserDto {}
