export const JWT_Expires_Time = {
  refresh: 3600 * 24 * 7,
  access: 3600 * 3,
};

export const COOKIE_MAX_AGE = {
  access: JWT_Expires_Time.access * 1000,
  refresh: JWT_Expires_Time.refresh * 1000,
};

export const REFRESH_COOKIE_PATH = '/auth';
