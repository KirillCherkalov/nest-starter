import { Injectable, Inject } from '@nestjs/common';
import nodemailer, { TestAccount } from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

import { ConfigService } from 'src/config/services/config.service';

@Injectable()
export class EmailsService {
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
  }

  async sendMail(sendMailDto: Mail.Options): Promise<string | false> {
    const info = await this.transporter.sendMail({
      from: sendMailDto.from,
      to: sendMailDto.to,
      subject: sendMailDto.subject,
      html: sendMailDto.html,
    });

    // Preview only available when sending through an Ethereal account
    return nodemailer.getTestMessageUrl(info);
  }
}
