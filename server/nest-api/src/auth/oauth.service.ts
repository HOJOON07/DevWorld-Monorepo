import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OAuthConfig } from './config/oauth.config';
import {
  fetchGithubEmails,
  fetchGithubUser,
  fetchGoogleUser,
  OAuthUserInfo,
  requestGithubToken,
  requestGoogleToken,
  transformGithubUserInfo,
  transformGoogleUserInfo,
  withErrorHandling,
} from './utils/oauth.utils';

type Provider = 'github' | 'google';

@Injectable()
export class OAuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly oauthConfig: OAuthConfig,
  ) {}

  generateOAuthRedirectUrl(provider: 'github' | 'google'): string {
    return this.oauthConfig.generateAuthUrl(this.oauthConfig[provider]);
  }

  async getAccessToken(provider: Provider, code: string): Promise<string> {
    const tokenRequest = this.oauthConfig.createTokenRequest(provider, code);
    const tokenRequester = provider === 'github' ? requestGithubToken : requestGoogleToken;

    return withErrorHandling(tokenRequester, `${provider} 액세스 토큰 요청 실패`)(tokenRequest);
  }

  async getUserInfo(provider: Provider, accessToken: string): Promise<OAuthUserInfo> {
    if (provider === 'github') {
      const [userData, emailData] = await Promise.all([
        withErrorHandling(fetchGithubUser, 'GitHub 사용자 정보 요청 실패')(accessToken),
        withErrorHandling(fetchGithubEmails, 'GitHub 이메일 정보 요청 실패')(accessToken),
      ]);
      return transformGithubUserInfo(userData, emailData as any);
    }

    if (provider === 'google') {
      const userData = await withErrorHandling(
        fetchGoogleUser,
        'Google 사용자 정보 요청 실패',
      )(accessToken);
      return transformGoogleUserInfo(userData);
    }

    throw new Error(`지원하지 않는 OAuth 제공자: ${provider}`);
  }

  async processOAuthLogin(provider: Provider, code: string): Promise<OAuthUserInfo> {
    return withErrorHandling(async (provider: Provider, code: string) => {
      const accessToken = await this.getAccessToken(provider, code);
      return this.getUserInfo(provider, accessToken);
    }, `${provider} OAuth 로그인 과정 실패`)(provider, code);
  }
}
