import { Button } from '@devworld/ui';
import { getRedirectUrl } from '../../api/get-redirect-url';
import { IconNameList } from '../../assets/icon-map';
import OAuthIcon from '../../assets/oauth-icon';

type OAuthProvider = 'google' | 'github';

interface Props {
  iconName: IconNameList;
  label: string;
  provider: OAuthProvider;
}

export default function OAuthButton({ iconName, label, provider }: Props) {
  const handleOAuthLogin = async () => {
    try {
      const { redirectUrl } = await getRedirectUrl(provider);
      window.location.href = redirectUrl;
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <Button variant='outline' onClick={handleOAuthLogin}>
      <OAuthIcon name={iconName}></OAuthIcon>
      {label}
    </Button>
  );
}
