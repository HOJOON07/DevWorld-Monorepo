import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosResponse } from 'axios';
import handleAxiosError from 'src/common/axios-error/handle-error';

export interface OAuthUserInfo {
  email: string;
  devName: string;
  github?: string;
  location?: string;
  bio?: string;
  company?: string;
  socialEtc?: string;
}

type Provider = 'github' | 'google';

@Injectable()
export class OAuthService {
  private readonly baseUrls: Record<Provider, string>;
  private readonly clientIds: Record<Provider, string>;
  private readonly clientSecrets: Record<Provider, string>;
  private readonly scopes: Record<Provider, string>;
  private readonly redirectUri: string;

  constructor(private readonly configService: ConfigService) {
    this.baseUrls = {
      github: 'https://github.com/login/oauth/authorize',
      google: 'https://accounts.google.com/o/oauth2/v2/auth',
    };

    this.clientIds = {
      github: this.configService.get<string>('GITHUB_CLIENT_ID')!,
      google: this.configService.get<string>('GOOGLE_CLIENT_ID')!,
    };

    this.clientSecrets = {
      github: this.configService.get<string>('GITHUB_CLIENT_SECRET'),
      google: this.configService.get<string>('GOOGLE_CLIENT_SECRET'),
    };

    this.scopes = {
      github: 'user:email',
      google: 'openid email profile',
    };

    this.redirectUri = 'http://localhost:3000/auth/callback/';
  }

  generateOAuthRedirectUrl(provider: 'github' | 'google'): string {
    const params = new URLSearchParams({
      client_id: this.clientIds[provider],
      scope: this.scopes[provider],
      response_type: 'code',
      access_type: provider === 'google' ? 'offline' : undefined,
      include_granted_scopes: provider === 'google' ? 'true' : undefined,
      redirect_uri: this.redirectUri + provider,
      prompt: provider === 'google' ? 'consent' : undefined,
    });

    return `${this.baseUrls[provider]}?${params.toString()}`;
  }

  async getGithubAccessToken(githubCode: string): Promise<string> {
    const getTokenUrl = 'https://github.com/login/oauth/access_token';
    const request = {
      code: githubCode,
      client_id: this.clientIds['github'],
      client_secret: this.clientSecrets['github'],
    };

    try {
      const response: AxiosResponse = await axios.post(getTokenUrl, request, {
        headers: {
          accept: 'application/json',
        },
      });

      if (response.data.error) {
        throw new UnauthorizedException('Github Authorization Failed');
      }

      if (!response.data.access_token) {
        throw new InternalServerErrorException('액세스 토큰이 반환되지 않았습니다.');
      }

      return response.data.access_token;
    } catch (error) {
      console.error('GitHub Access Token을 받아오는 과정에서 에러가 발생했습니다:', error);
      handleAxiosError(error);
    }
  }

  async getGithubUserInfo(accessToken: string): Promise<OAuthUserInfo> {
    try {
      const userResponse = await axios.get('https://api.github.com/user', {
        headers: {
          authorization: `token ${accessToken}`,
        },
      });

      const emailResponse = await axios.get('https://api.github.com/user/emails', {
        headers: {
          authorization: `token ${accessToken}`,
        },
      });

      const { login } = userResponse.data;
      const primaryEmail = emailResponse.data
        .filter((email: any) => email.primary && email.verified)
        .map((data: any) => data.email)[0];

      return {
        email: primaryEmail,
        devName: login,
      };
    } catch (error) {
      console.error('GitHub 사용자 정보를 가져오는 과정에서 에러가 발생했습니다:', error);
      handleAxiosError(error);
    }
  }

  async getGoogleAccessToken(googleCode: string): Promise<string> {
    const tokenUrl = 'https://oauth2.googleapis.com/token';
    const requestBody = {
      code: googleCode,
      client_id: this.clientIds['google'],
      client_secret: this.clientSecrets['google'],
      redirect_uri: this.redirectUri + 'google',
      grant_type: 'authorization_code',
    };

    try {
      const response: AxiosResponse = await axios.post(tokenUrl, requestBody, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      if (response.data.error) {
        throw new UnauthorizedException('Google 인증을 실패했습니다.');
      }

      if (!response.data.access_token) {
        throw new InternalServerErrorException('액세스 토큰이 반환되지 않았습니다.');
      }

      return response.data.access_token;
    } catch (error) {
      console.error('Google Access Token을 받아오는 과정에서 에러가 발생했습니다:', error);
      handleAxiosError(error);
    }
  }

  async getGoogleUserInfo(accessToken: string): Promise<OAuthUserInfo> {
    try {
      const response = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const { email, name } = response.data;
      return {
        email,
        devName: name,
      };
    } catch (error) {
      console.error('Google 사용자 정보를 가져오는 과정에서 에러가 발생했습니다:', error);
      handleAxiosError(error);
    }
  }

  async processOAuthLogin(provider: 'github' | 'google', code: string): Promise<OAuthUserInfo> {
    try {
      let accessToken: string;
      let userInfo: OAuthUserInfo;

      switch (provider) {
        case 'github':
          accessToken = await this.getGithubAccessToken(code);
          userInfo = await this.getGithubUserInfo(accessToken);
          break;
        case 'google':
          accessToken = await this.getGoogleAccessToken(code);
          userInfo = await this.getGoogleUserInfo(accessToken);
          break;
        default:
          throw new UnauthorizedException('지원하지 않는 OAuth 제공자입니다.');
      }

      return userInfo;
    } catch (error) {
      console.error(`${provider} OAuth 로그인 과정에서 에러가 발생했습니다:`, error);
      handleAxiosError(error);
    }
  }
}
