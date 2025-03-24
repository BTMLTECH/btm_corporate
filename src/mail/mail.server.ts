import {
  EMAIL_FROM,
  EMAIL_HOST,
  EMAIL_PWD,
  EMAIL_USER,
} from "$env/static/private";
import nodemailer, { type Transporter } from "nodemailer";

export interface EmailOptions {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

export interface PackageOptions {
  name?: string;
  to: string;
  subject: string;
}

export class EmailService {
  private transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: "btmghana.net",
      port: 465,
      secure: true,
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PWD,
      },
    });
  }

  async sendEmail(options: EmailOptions): Promise<void> {
    const mailOptions = {
      from: EMAIL_FROM,
      ...options,
    };

    try {
      await this.transporter.sendMail(mailOptions);

      console.log("Email sent successfully");
    } catch (error: any) {
      console.error("Error sending email:", error);
      throw new Response(error, { status: 500 });
    }
  }

  async sendCreatedPackageNotification({ to, subject, name }: PackageOptions) {
    try {
      await this.sendEmail({
        to,
        subject,
        html: `
				<h2>Dear ${name}, you recently created a package on BTMGhana</h2>
				<p></p>
			`,
      });
    } catch (err: any) {
      return err;
    }
  }
}
