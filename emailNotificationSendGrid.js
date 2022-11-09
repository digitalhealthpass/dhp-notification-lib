/**
 * Digital Health Pass 
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 */

//npm install --save @sendgrid/mail

const Logger = require('./config/logger');
const logger = new Logger('sendEmail');

const senderEmailID = process.env.SENDER_EMAIL_ID;
const sendGridAPIKey = process.env.SENDGRID_API_KEY;

logger.info(`NODE JS RUNNING ON ${process.version}`);
logger.info(`SENDER_EMAIL_ID: ${senderEmailID}`);

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(sendGridAPIKey);

exports.sendGridEmail = function (toEmailID, message, verificationCode) {

    const mail = {
        to: toEmailID, // Change to your recipient
        from: senderEmailID, // Change to your verified sender
        subject: 'HealthPass with SendGrid...',
        text: message,
        html: message + "<b>" + verificationCode + "</b>",
    }

    sgMail.send(mail)
        .then(() => {
            logger.info('Email sent')
        })
        .catch((errMsg) => {
            logger.error(errMsg);
        });
}

exports.sendEmail = async (toEmailID, message) => {
    const mail = {
        to: toEmailID, // Change to your recipient
        from: senderEmailID, // Change to your verified sender
        subject: message.subject,
        text: message.content,
        html: message.content,
    }

    await sgMail.send(mail);
}