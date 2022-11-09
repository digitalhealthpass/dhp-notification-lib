/**
 * Digital Health Pass 
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 */
const { promisify } = require('util')
const aws = require('aws-sdk');
const REGION = process.env.AWS_REGION;
// AWS_ACCESS_KEY_ID & AWS_SECRET_ACCESS_KEY must be in env
aws.config.region = REGION || "us-east-1";
const senderEmailID = process.env.SENDER_EMAIL_ID;
const charset = "UTF-8";

exports.sendEmail = async (
    toEmailID, 
    message, 
    connectTimeout,
    timeout,
    maxRetries,
    retryDelay) => {
    let options = {
        apiVersion: '2010-12-01',
        httpOptions: {
            connectTimeout,
            timeout
        },
        maxRetries,
        retryDelayOptions: {
            base: retryDelay
        }
    };
    var params = {
        Destination: { 
            ToAddresses: [
            toEmailID,
          ]
        },
        Message: {
            Subject: {
                Data: message.subject,
                Charset: charset
            },
            Body: {
                Text: {
                    Data: message.content,
                    Charset: charset
                },
                Html: {
                    Data: message.content,
                    Charset: charset
                }
            }
        },
        Source: senderEmailID
      };
      
    return await new aws.SES(options).sendEmail(params).promise();
}