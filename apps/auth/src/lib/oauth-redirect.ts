export type OAuthProvider = 'google' | 'github';

const OAUTH_CALLBACK_URL = 'http://localhost:5500/auth/callback';

const getOAuthCallbackUrl = (provider: OAuthProvider) => {
  return `${OAUTH_CALLBACK_URL}/${provider}`;
};

export const fetchRedirectUrl = async (provider: OAuthProvider) => {
  const callbackUrl = getOAuthCallbackUrl(provider);

  const res = await fetch(callbackUrl);
  const redirectUrl = res.json();

  return redirectUrl;
};
