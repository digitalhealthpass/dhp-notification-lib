/**
 * Digital Health Pass 
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 */

//npm install nodemailer
var mailer = require("nodemailer");

const Logger = require('./config/logger');
const logger = new Logger('sendEmail');

const smtpHost = process.env.SMTP_HOST;
const smtpPort = process.env.SMTP_PORT;
const senderEmailID = process.env.SENDER_EMAIL_ID;
const smtpUser = process.env.SMTP_USER;
const smtpPassword = process.env.SMTP_PASSWORD;

logger.info(`NODE JS RUNNING ON ${process.version}`);
logger.info(`SMTP_HOST:SMTP_PORT: ${smtpHost}:${smtpPort}`);
logger.info(`SENDER_EMAIL_ID: ${senderEmailID}`);

// Use Smtp Protocol to send Email
var smtpTransport = mailer.createTransport({
    host: `${smtpHost}`,
    port: `${smtpPort}`,
    auth: {
        user: `${smtpUser}`,
        pass: `${smtpPassword}`
    }
});

exports.sendSMTPEmail = function (toEmailID, message) {

    const mail = {
        to: toEmailID, // Change to your recipient
        from: senderEmailID, // Change to your verified sender
        subject: message.subject,
        text: message.content,
        html: message.content,
    }

    smtpTransport.sendMail(mail, function (error, info) {
        if (error) {
            const errMsg = `Failed to send Email: ${error}`;
            logger.error(errMsg);
        } else {
            logger.info(`Message sent: ${info.response}`);
        }

        smtpTransport.close();
    });

}
