import { IsOptional, IsString } from 'class-validator';

export class OAuthUserInfoDto {
  @IsString()
  email: string;

  @IsString()
  devName: string;

  @IsString()
  @IsOptional()
  github?: string;

  @IsString()
  @IsOptional()
  location?: string;

  @IsString()
  @IsOptional()
  socialEtc?: string;

  @IsString()
  @IsOptional()
  company?: string;

  @IsString()
  @IsOptional()
  bio?: string;
}

export class OAuthCodeDto {
  @IsString()
  readonly code: string;
}

export class OAuthLoginDto {
  @IsString()
  readonly provider: 'github' | 'google';

  @IsString()
  readonly code: string;
}
