import Github from './github-icon';
import Google from './google-icon';

export const IconAssetList = {
  github: Github,
  google: Google,
};

export type IconNameList = keyof typeof IconAssetList;
