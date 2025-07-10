import { InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';
import handleAxiosError from 'src/common/axios-error/handle-error';

// 함수형 프로그래밍: 순수 함수들
export interface TokenRequest {
  code: string;
  client_id: string;
  client_secret: string;
  redirectUri?: string;
  grantType?: string;
}

export interface OAuthUserInfo {
  email: string;
  devName: string;
  github?: string;
  location?: string;
  bio?: string;
  company?: string;
  socialEtc?: string;
}

// 공통 토큰 요청 함수 (currying 패턴)
export const createTokenRequester =
  (url: string) =>
  async (request: TokenRequest): Promise<string> => {
    try {
      const response: AxiosResponse = await axios.post(url, request, {
        headers: {
          accept: 'application/json',
        },
      });

      if (response.data.error) {
        throw new UnauthorizedException(`OAuth 인증 실패: ${response.data.error}`);
      }

      if (!response.data.access_token) {
        throw new InternalServerErrorException('액세스 토큰이 반환되지 않았습니다.');
      }

      return response.data.access_token;
    } catch (error) {
      // console.error('Access Token 요청 중 에러:', error);
      handleAxiosError(error);
    }
  };

// 공통 사용자 정보 요청 함수 (currying 패턴)
export const createUserInfoFetcher =
  <T>(url: string, authHeaderPrefix: string) =>
  async (accessToken: string): Promise<T> => {
    try {
      const response = await axios.get(url, {
        headers: {
          authorization: `${authHeaderPrefix} ${accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      // console.error('사용자 정보 요청 중 에러:', error);
      handleAxiosError(error);
    }
  };

// GitHub 전용 함수들 (GitHub는 accept만 필요)
export const requestGithubToken = async (request: TokenRequest): Promise<string> => {
  try {
    const response: AxiosResponse = await axios.post(
      'https://github.com/login/oauth/access_token',
      request,
      {
        headers: {
          accept: 'application/json',
        },
      },
    );

    if (response.data.error) {
      throw new UnauthorizedException(`GitHub OAuth 인증 실패: ${response.data.error}`);
    }

    if (!response.data.access_token) {
      throw new InternalServerErrorException('액세스 토큰이 반환되지 않았습니다.');
    }

    return response.data.access_token;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const fetchGithubUser = createUserInfoFetcher('https://api.github.com/user', 'token');
export const fetchGithubEmails = createUserInfoFetcher(
  'https://api.github.com/user/emails',
  'token',
);

// Google 전용 함수들 (Google은 Content-Type 필요)
export const requestGoogleToken = async (request: TokenRequest): Promise<string> => {
  try {
    const response: AxiosResponse = await axios.post(
      'https://oauth2.googleapis.com/token',
      request,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );

    if (response.data.error) {
      throw new UnauthorizedException(`Google OAuth 인증 실패: ${response.data.error}`);
    }

    if (!response.data.access_token) {
      throw new InternalServerErrorException('액세스 토큰이 반환되지 않았습니다.');
    }

    return response.data.access_token;
  } catch (error) {
    // console.error('Google Access Token 요청 중 에러:', error);
    handleAxiosError(error);
  }
};
export const fetchGoogleUser = createUserInfoFetcher(
  'https://www.googleapis.com/oauth2/v2/userinfo',
  'Bearer',
);

// 데이터 변환 함수들 (순수 함수)
export const transformGithubUserInfo = (userData: any, emailData: any[]): OAuthUserInfo => {
  const primaryEmail = emailData
    .filter((email) => email.primary && email.verified)
    .map((data) => data.email)[0];

  return {
    email: primaryEmail,
    devName: userData.login,
    github: userData.html_url,
    location: userData.location,
    bio: userData.bio,
    company: userData.company,
    socialEtc: userData.blog,
  };
};

export const transformGoogleUserInfo = (userData: any): OAuthUserInfo => ({
  email: userData.email,
  devName: userData.name,
});

// 에러 핸들링 래퍼 (함수형 패턴)
export const withErrorHandling =
  <T extends any[], R>(fn: (...args: T) => Promise<R>, errorMessage: string) =>
  async (...args: T): Promise<R> => {
    try {
      return await fn(...args);
    } catch (error) {
      // console.error(`${errorMessage}:`, error);
      throw error;
    }
  };
