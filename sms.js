/**
 * Digital Health Pass 
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 */

/**
 * Generic REST call based send SMS messages via AWS SNS
 * This assumes that the following environment variables are set
 * 
 * AWS_ACCESS_KEY_ID=xxx
 * AWS_SECRET_ACCESS_KEY=xxx 
 * AWS_REGION=xxx
 */

const aws = require('aws-sdk');
const querystring = require('querystring');
const Logger = require('./config/logger');

const logger = new Logger('rest-sms-notify');

// AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, and AWS_REGION must be in env
let validatedInitParams = false;
const validateAwsParams = () => {
    if (!process.env.AWS_REGION)
        throw new Error("Required AWS_ACCESS_KEY_ID variable is not set: AWS_REGION");
    if (!process.env.AWS_ACCESS_KEY_ID)
        throw new Error("Required AWS_ACCESS_KEY_ID variable is not set: AWS_ACCESS_KEY_ID");
    if (!process.env.AWS_SECRET_ACCESS_KEY)
        throw new Error("Required Environment variable is not set: AWS_SECRET_ACCESS_KEY");

    validatedInitParams = true;
}

/**
 * 
 * @param {*} toPhoneNo - string containing phone number to send message to
 * @param {*} smsMessageStr - SMS message to send
 * @param {*} connectTimeout - SMS connect timeout in milliseconds
 * @param {*} timeout - SMS timeout after connection in milliseconds
 * @param {*} maxRetries - The max number of retries for sending SMS to AWS
 * @param {*} retryDelay - The amount of time to wait between retries in milliseconds
 */

exports.sendSMSMessage =
    async (
        toPhoneNo,
        smsMessageStr,
        connectTimeout,
        timeout,
        maxRetries,
        retryDelay
    ) => {
        if (!validatedInitParams)
            validateAwsParams();


        if (!toPhoneNo || !smsMessageStr) {
            const errMsg = "SMS send require mandatory params: toPhoneNo, smsMessageStr"
            throw Error(errMsg);
        }

        const params = {
            'Message': smsMessageStr,
            'PhoneNumber': toPhoneNo
        }
    
        const options = {
            apiVersion: '2010-03-31',
            httpOptions: {
                connectTimeout,
                timeout
            },
            maxRetries,
            retryDelayOptions: {
                base: retryDelay
            }
        }

        return new aws.SNS(options).publish(params).promise();
    }
