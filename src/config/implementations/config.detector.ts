import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { Injectable, Inject } from '@nestjs/common';

import { IConfigDetector } from '../abstracts/config.detector';
import { IConfig } from '../abstracts/config';
import { IValidator } from '../abstracts/validator';
import TYPES from '../types';
import { ENV_FILE_PATH } from '../constants';

@Injectable()
export class ConfigDetector implements IConfigDetector {
  constructor(
    @Inject(TYPES.Validator) private readonly validator: IValidator,
  ) {}

  public getConfig(): IConfig {
    let rawConfig: Record<string, string>;

    const fileAvailable: boolean = this.checkConfigFileAvailability(
      ENV_FILE_PATH,
    );

    if (fileAvailable) {
      const fileContent = fs.readFileSync(ENV_FILE_PATH);
      rawConfig = dotenv.parse(fileContent);
    } else {
      /**
       * interfaces do not exist in runtime so we cannot get list of IConfig properties and pick them from process.env
       */
      rawConfig = process.env;
    }

    const config: IConfig = this.validator.validate(rawConfig);

    return config;
  }

  private checkConfigFileAvailability(path: string): boolean {
    try {
      fs.accessSync(path, fs.constants.R_OK);
      return true;
    } catch (err) {
      return false;
    }
  }
}
