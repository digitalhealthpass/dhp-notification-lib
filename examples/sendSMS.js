/**
 * Digital Health Pass 
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 *
 */


//----------------------------------
// Example of sending SMS using Amazon AWS SNS service: uses async style function sendSMS
//
//accepted phone formats: xxx-xxx-xxxx, (xxx) xxx xxxx, +1 xxx-xxx-xxxx, +1 (xxx)-xxx-xxxx, +1xxxxxxxxxx, 

/* set these Env vars from AWS user account
AWS_ACCESS_KEY_ID=xxx
AWS_SECRET_ACCESS_KEY=xxx 
AWS_REGION=xxx
*/
var restSMSLib = require("../sms");
const Logger = require('../config/logger');

const logger = new Logger('testSMS');

async function runSMSTest() {
    const toPhoneNo = '1234567890';
    const message = `Test: Sent from runSMSTest, at ${new Date().toLocaleString()}`;
    logger.debug(`toPhoneNo ${toPhoneNo} , sending MSG ${message}`);

    const beforeCall = Date.now();
    try {
        const smsResponse = await restSMSLib.sendSMSMessage(toPhoneNo, message);
        const afterCall = Date.now();
        logger.info(`Time taken(ms) = ${afterCall - beforeCall}`);
        logger.info(`sent SMS with RequestId=${smsResp.ResponseMetadata.RequestId} MessageId=${smsResp.MessageId}`, txID);
    } catch (error) {
        const afterCall = Date.now();
        logger.error(`${error.message}\n  Time taken(ms) = ${afterCall - beforeCall}`);

    }
}

runSMSTest();

