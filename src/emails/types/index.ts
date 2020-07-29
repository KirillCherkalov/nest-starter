import Mail from 'nodemailer/lib/mailer';

export interface sendEmail extends Mail.Options {
  templateId: string;
  data: Record<string, unknown>;
}

export interface loadAssetsOptions {
  path: string;
}
