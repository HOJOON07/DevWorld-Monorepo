import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export interface OAuthProviderConfig {
  baseUrl: string;
  client_id: string;
  client_secret: string;
  scope: string;
  redirectUri: string;
  additionalParams?: Record<string, string>;
}

@Injectable()
export class OAuthConfig {
  private readonly redirectBaseUri = 'http://localhost:3000/auth/callback/';

  constructor(private readonly configService: ConfigService) {}

  // 함수형: 설정 생성 팩토리
  private createProviderConfig = (
    provider: 'github' | 'google',
    baseUrl: string,
    scope: string,
    additionalParams?: Record<string, string>,
  ): OAuthProviderConfig => ({
    baseUrl,
    client_id: this.configService.get<string>(`${provider.toUpperCase()}_CLIENT_ID`)!,
    client_secret: this.configService.get<string>(`${provider.toUpperCase()}_CLIENT_SECRET`)!,
    scope,
    redirectUri: this.redirectBaseUri + provider,
    additionalParams,
  });

  // 각 제공자별 설정
  readonly github = this.createProviderConfig(
    'github',
    'https://github.com/login/oauth/authorize',
    'user:email',
  );

  readonly google = this.createProviderConfig(
    'google',
    'https://accounts.google.com/o/oauth2/v2/auth',
    'openid email profile',
    {
      access_type: 'offline',
      include_granted_scopes: 'true',
      prompt: 'consent',
    },
  );

  // URL 생성 함수 (순수 함수)
  generateAuthUrl = (config: OAuthProviderConfig): string => {
    const params = new URLSearchParams({
      client_id: config.client_id,
      scope: config.scope,
      response_type: 'code',
      redirect_uri: config.redirectUri,
      ...config.additionalParams,
    });

    return `${config.baseUrl}?${params.toString()}`;
  };

  // 토큰 요청 데이터 생성 (순수 함수)
  createTokenRequest = (provider: 'github' | 'google', code: string) => {
    const config = this[provider];

    if (provider === 'github') {
      return {
        code,
        client_id: config.client_id,
        client_secret: config.client_secret,
      };
    }

    // Google
    return {
      code,
      client_id: config.client_id,
      client_secret: config.client_secret,
      redirectUri: config.redirectUri,
      grantType: 'authorization_code',
    };
  };
}
