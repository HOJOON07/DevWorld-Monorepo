import { IconAssetList, IconNameList } from './icon-map';

interface Props {
  name: IconNameList;
}

export default function OAuthIcon({ name }: Props) {
  const OauthIconSVGComponent = IconAssetList[name];

  return <OauthIconSVGComponent />;
}
