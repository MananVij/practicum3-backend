import nodemailer from "nodemailer";
import { google } from "googleapis";

//this is secret it should be removed from here
const CLIENT_ID =
  "319011365856-sbqj52fbrvpj5k3m4kf8cffi24mt6r8d.apps.googleusercontent.com";
const CLEINT_SECRET = "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";
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN =
  "1//04y0EPNipT0reCgYIARAAGAQSNwF-L9Ir3V0tmM-Zr_A4z3tvoMS9XBZxAw94254m9A_SSs44fxgbyr280X3AIEbZ1yG_6FV3qm4";

// @desc    New resource mail
// @route   POST /email
// @access  Public
const sendEmail = async (req, res) => {
  try {
    let { resourceName, resourceLink, category, name } = req.body;
    const oAuth2Client = new google.auth.OAuth2(
      CLIENT_ID,
      CLEINT_SECRET,
      REDIRECT_URI
    );

    oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
    const accessToken = await oAuth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "thedesignerslobby@gmail.com",
        clientId: CLIENT_ID,
        clientSecret: CLEINT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    var mailOptions = {
      from: '"Designers Lobby" <thedesignerslobby@gmail.com>',
      to: "thedesignerslobby@gmail.com",
      subject: "New Resource Suggestion",
      text: "New Resource is Here!",
      html: `<b>Hey there! </b><br> This is our first message sent with Nodemailer<br />${name} ${resourceName} ${resourceLink} ${category}`,
    };
    transport.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log("Message sent: %s", info.messageId);
      res.status(200).json({
        status: "Successfully sent",
        msg: info.messageId,
      });
    });
  } catch (error) {
    throw new Error(error);
  }
};

// @desc    news letter mail
// @route   POST /email/newsletter
// @access  Public

const NewsletterEmail = async (req, res) => {
  try {
    let { email } = req.body;
    const oAuth2Client = new google.auth.OAuth2(
      CLIENT_ID,
      CLEINT_SECRET,
      REDIRECT_URI
    );

    oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
    const accessToken = await oAuth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "thedesignerslobby@gmail.com",
        clientId: CLIENT_ID,
        clientSecret: CLEINT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });
    var mailOptions = {
      from: '"Designers Lobby" <thedesignerslobby@gmail.com>',
      to: "thedesignerslobby@gmail.com",
      subject: "Newsletter Subscription",
      text: "New Resource is Here!",
      html: `<b>Hey there! </b><br> This is our first message sent with Nodemailer<br />${email}`,
    };
    transport.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log("Message sent: %s", info.messageId);
      res.status(200).json({
        status: "Successfully sent",
        msg: info.messageId,
      });
    });
  } catch (error) {
    throw new Error(error);
  }
};

export { sendEmail, NewsletterEmail };
