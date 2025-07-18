import { PartialType, PickType } from '@nestjs/mapped-types';
import { IsEmail, IsOptional, IsString, IsUrl, Length } from 'class-validator';
import { EmailValidationMessage } from 'src/common/validation-message/email-validation.message';
import { lengthValidationMessage } from 'src/common/validation-message/length-validation.message';
import { stringValidationMessage } from 'src/common/validation-message/string-validation.message';
import { UrlValidationMessage } from 'src/common/validation-message/url-validation.message';
import { UserModel } from '../entities/users.entity';

export class PickUserModelEdit extends PickType(UserModel, [
  'devName',
  'bio',
  'position',
  'github',
  'linkedin',
  'instagram',
  'socialEtc',
  'email',
  'location',
]) {}

export class UserProfileEditDto extends PartialType(PickUserModelEdit) {
  @IsString({ message: stringValidationMessage })
  @Length(2, 15, { message: lengthValidationMessage })
  devName: string;

  @IsString({ message: stringValidationMessage })
  @IsOptional()
  bio?: string;

  @IsString({ message: stringValidationMessage })
  @IsOptional()
  position?: string;

  @IsString({ message: stringValidationMessage })
  @IsOptional()
  github?: string;

  @IsUrl({}, { message: UrlValidationMessage })
  @IsOptional()
  linkedin?: string;

  @IsString({ message: stringValidationMessage })
  @IsOptional()
  instagram?: string;

  @IsUrl({}, { message: UrlValidationMessage })
  @IsOptional()
  socialEtc?: string;

  @IsEmail({}, { message: EmailValidationMessage })
  email: string;

  @IsString({ message: stringValidationMessage })
  @IsOptional()
  location?: string;
}
