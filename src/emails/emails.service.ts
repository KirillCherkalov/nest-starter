import fs from 'fs';
import path from 'path';

import { Injectable, Inject } from '@nestjs/common';
import nodemailer, { TestAccount } from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import Handlebars from 'handlebars';

import { ConfigService } from 'src/config/services/config.service';

import { sendEmail, loadAssetsOptions } from './types';

@Injectable()
export class EmailsService {
  private templates: Record<string, string>;

  private readonly transporter: Mail;

  constructor(
    @Inject('TEST_ACCOUNT') testAccount: TestAccount,
    private readonly configService: ConfigService,
  ) {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });

    this.templates = {};

    this.loadPartials();
    this.loadTemplates();
  }

  private loadAssets({ path }: loadAssetsOptions) {
    const filenames = fs.readdirSync(path);

    const temporary: Record<string, string> = {};

    filenames.forEach(filename => {
      const matches = /^([^.]+).handlebars$/.exec(filename);

      if (!matches) {
        return;
      }

      const name = matches[1];
      const template = fs.readFileSync(path + '/' + filename, 'utf8');

      temporary[name] = template;
    });

    return temporary;
  }

  private loadTemplates() {
    const templatesDir = path.join(__dirname, 'templates');

    this.templates = this.loadAssets({ path: templatesDir });
  }

  private loadPartials() {
    const partialsDir = path.join(__dirname, 'partials');

    const map = this.loadAssets({ path: partialsDir });

    Object.keys(map).forEach(key => {
      Handlebars.registerPartial(key, map[key]);
    });
  }

  async sendMail(sendMailDto: sendEmail): Promise<string | false> {
    const template = Handlebars.compile(this.templates[sendMailDto.templateId]);

    const info = await this.transporter.sendMail({
      from: sendMailDto.from,
      to: sendMailDto.to,
      subject: sendMailDto.subject,
      html: template(sendMailDto.data),
    });

    // Preview only available when sending through an Ethereal account
    return nodemailer.getTestMessageUrl(info);
  }
}
