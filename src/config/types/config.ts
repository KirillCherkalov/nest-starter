export interface Config {
  NODE_ENV: string;
  DB_HOST: string;
  DB_PORT: number;
  DB_NAME: string;
  DB_USER: string;
  DB_PASSWORD: string;
  APP_PORT: number;
  JWT_SECRET: string;
  JWT_REFRESH_SECRET: string;
  BASE_FRONTEND_URL: string;
  JWT_EXPIRES_IN: string;
}
