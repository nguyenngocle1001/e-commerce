const nodemailer = require('nodemailer');
const pug = require('pug');
const htmlToText = require('html-to-text');

module.exports = class Email {
  constructor(user) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.from = `Lexe <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    if (process.env.NODE_ENV === 'production') {
      return nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        service: 'Gmail',
        auth: {
          user: 'lexestore.finalproject2022@gmail.com',
          pass: 'lexestorepassword',
        },
        tls: {
          rejectUnauthorized: false,
        },
      });
    }

    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  // Send the actual email
  async send(template, subject, token, url) {
    // 1) Render HTML based on a pug template
    const html = pug.renderFile(
      `${__dirname}/../templates/email/${template}.pug`,
      {
        firstName: this.firstName,
        subject,
        token,
        url,
      }
    );

    // 2) Define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject: subject,
      html,
      text: htmlToText.fromString(html),
    };

    // 3) Create a transport and send email
    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send('welcome', 'Welcome to the Lexe Store!');
  }

  async sendOrder() {
    await this.send('order', 'Orders have successfully created!');
  }

  async sendPasswordReset(token) {
    const url = `${process.env.RESET_PASSWORD_LINK}?token=${token}`;
    await this.send(
      'passwordReset',
      'Your password reset token (valid for only 10 minutes)',
      token,
      url
    );
  }
};
