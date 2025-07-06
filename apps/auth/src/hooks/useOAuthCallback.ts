import { useEffect, useState } from 'react';
import { redirect, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { OAuthProvider } from '../api/get-redirect-url';
import { oauthLogin } from '../api/oauth-login';

interface UseOAuthCallbackResult {
  isLoading: boolean;
  error: string | null;
  data: any | null;
}

export const useOAuthCallback = (): UseOAuthCallbackResult => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any | null>(null);

  const { provider } = useParams<{ provider: OAuthProvider }>();

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const handleOAuthCallback = async () => {
      try {
        const searchParams = new URLSearchParams(window.location.search);
        const code = searchParams.get('code');
        const errorParam = searchParams.get('error');

        if (errorParam) {
          throw new Error(`OAuth 에러: ${errorParam}`);
        }

        if (!code) {
          throw new Error('Authorization code가 없습니다.');
        }

        if (!provider) {
          throw new Error('Provider가 지정되지 않았습니다.');
        }

        const result = await oauthLogin(provider, code);
        setData(result);
      } catch (err) {
        console.error('OAuth 로그인 실패:', err);
        setError(err instanceof Error ? err.message : '알 수 없는 에러가 발생했습니다.');
      } finally {
        setIsLoading(false);
        window.location.href = '/feed';
      }
    };

    handleOAuthCallback();
  }, [provider, searchParams, navigate]);

  return {
    isLoading,
    error,
    data,
  };
};
