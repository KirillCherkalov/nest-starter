import { IConfig } from './config';

export interface IValidator {
  validate(value: any): IConfig;
}
