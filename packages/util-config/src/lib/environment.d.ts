declare global {
  namespace NodeJS {
    interface ProcessEnv {
      APP_ENV?: 'dev' | 'prod' | 'staging';
      PORT?: string;
      SUPERADMIN_USERNAME?: string;
      SUPERADMIN_PASSWORD?: string;
      COOKIE_SECRET?: string;
    }
  }
}

export {}; 