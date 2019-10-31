import { IConfig } from './config';

export interface IConfigDetector {
  getConfig(): IConfig;
}
