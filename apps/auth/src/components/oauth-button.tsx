import { Button } from '@devworld/ui';
import { IconNameList } from '../assets/icon-map';
import OAuthIcon from '../assets/oauth-icon';

interface Props {
  iconName: IconNameList;
  label: string;
}

export default function OAuthButton({ iconName, label }: Props) {
  return (
    <Button variant='outline'>
      <OAuthIcon name={iconName}></OAuthIcon>
      {label}
    </Button>
  );
}
