export type MFEApp = 'auth' | 'workspace' | 'feed';
export type MFEAppType = `app-${MFEApp}`;

export type AppEventMap = {
  'global:navigate': string;
  '[app-shell] navigated': string;
} & { [K in `[${MFEAppType}] navigated`]: string };
