import * as fs from 'fs';

import * as dotenv from 'dotenv';
import { Injectable } from '@nestjs/common';

import { ENV_FILE_PATH } from '../constants';
import { Config } from '../types/config';

import { ConfigValidator } from './validator';

@Injectable()
export class ConfigDetector {
  constructor(private readonly validator: ConfigValidator) {}

  public getConfig(): Config {
    let rawConfig: Record<string, string>;

    const fileAvailable: boolean = this.checkConfigFileAvailability(
      ENV_FILE_PATH,
    );

    if (fileAvailable) {
      const fileContent = fs.readFileSync(ENV_FILE_PATH);

      rawConfig = dotenv.parse(fileContent);
    } else {
      /**
       * interfaces do not exist in runtime so we cannot get list of Config properties and pick them from process.env
       */
      rawConfig = process.env;
    }

    const config: Config = this.validator.validate(rawConfig);

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
