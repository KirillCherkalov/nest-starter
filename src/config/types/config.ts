export interface Config {
  NODE_ENV: string;
  DB_HOST: string;
  DB_PORT: number;
  DB_NAME: string;
  DB_USER: string;
  DB_PASSWORD: string;
  APP_PORT: number;
  // replace SESSION_SECRET on JWT_SECRET for jwt auth
  // JWT_SECRET: string;
  SESSION_SECRET: string;
}
