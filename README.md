## Readme

**Merative<sup>®</sup> Digital Health Pass**

# Email and SMS Notification Library

**Version 1.0, November 2022**   © Copyright Merative US L.P. and others 2022

[↳ Introduction](#introduction)

[↳ Installation](#installation)

[↳ Email Notifications Environment Variables](#email-notifications-environment-variables)

[↳ SMS Notifications Environment Variables](#sms-notifications-environment-variables)

[↳ Email Notifications Example](#email-notifications-example)

[↳ SMS Notifications Example](#sns-notifications-example)

[↳ Library Licenses](#library-licenses)

## Introduction

Merative<sup>®</sup> provides this package for use with [Digital Health Pass](https://www.ibm.com/products/digital-health-pass/ "Digital Health Pass") for sending SMS and email notifications using Amazon AWS SES(email) and SNS(SMS) services.

[↑ Top](#readme)

## Installation

To install this package run the following from a command line.

```
npm i git+ssh://git@github.com:digitalhealthpass/dhp-notification-lib.git
```

[↑ Top](#readme)

## Email Notifications Environment Variables

The following environment variables must be set in order to send email notifications.

| Environment Variable | Value                                                          |
| -------------------- | -------------------------------------------------------------- |
| AWS_REGION           | The region from the Amazon AWS SES service.  e.g. us-east-1    |
| SENDER_EMAIL_ID      | The "from" email address on the sent email notification        |

[↑ Top](#readme)

## SMS Notifications Environment Variables

The following environment variables must be set in order to send SMS notifications.

| Environment Variable  | Value                                                         |
| --------------------- | ------------------------------------------------------------- |
| AWS_REGION            | The region from the Amazon AWS SNS service.  e.g. us-east-1   |
| AWS_ACCESS_KEY_ID     | The access key id from the Amazon AWS SNS service             |
| AWS_SECRET_ACCESS_KEY | The secret access key from the Amazon AWS SNS service         |

[↑ Top](#readme)

## Email Notifications Example

```
    const notificationLib = require('healthpass-notification');
    ...
    try {
        await notificationLib.sendEmail(
            email, 
            message, 
            mailConnectTimeout,
            mailTimeout, 
            mailMaxRetries, 
            mailRetryDelay);
        logger.info(`send email notification successful`);
    } catch (error) {
        logger.error(`Error sending email notification: ${error.message}`);
        throw error;
    }
```

| Parameter             | Value                                                             |
| --------------------- | ----------------------------------------------------------------- |
| email                 | The recipient's email address                                     |
| message               | The email notification body                                       |
| mailConnectTimeout    | The connection timeout in milliseconds.  e.g. 10000 = 10 seconds  |
| mailTimeout           | The timeout in milliseconds.  e.g. 10000                          |
| mailMaxRetries        | The number of retry attempts on a failed attempt                  |
| mailRetryDelay        | The delay in milliseconds between a failed retry.  e.g. 2000      |

[↑ Top](#readme)

## SMS Notifications Example

To send an SMS notification the `formattedToPhoneNo` must be a normalized phone number in E.164 format.  A package such as [phone](https://www.npmjs.com/package/phone) can be used to normalize the number.

```
    const notificationLib = require('healthpass-notification');
    ...
    try {
        smsResp = await notificationLib.sendSMSMessage(
            formattedToPhoneNo,
            message,
            connectTimeout,
            timeout,
            maxRetries,
            retryDelay
        );
        logger.info(`sendSMS RequestId=${smsResp.ResponseMetadata.RequestId} MessageId=${smsResp.MessageId}`);
    } catch (error) {
        logger.error(`Error sending SMS notification: ${error}`);
        throw error;
    }

    if (smsResp.data && smsResp.data.status === 'failed') {
        const msg = `SMS message send failed. ${smsResp.data.error_message}`;
        logger.error(`Failed to send SMS. Error: ${msg} ErrorCode: ${smsResp.data.error_code}`);
        throw new Error(msg);
    }
```

| Parameter             | Value                                                             |
| --------------------- | ----------------------------------------------------------------- |
| formattedToPhoneNo    | The recipient's E.164 normalized phone number                     |
| message               | The SMS message                                                   |
| connectTimeout        | The connection timeout in milliseconds.  e.g. 10000 = 10 seconds  |
| timeout               | The timeout in milliseconds.  e.g. 10000                          |
| maxRetries            | The number of retry attempts on a failed attempt                  |
| retryDelay            | The delay in milliseconds between a failed retry.  e.g. 2000      |

[↑ Top](#readme)


## Library Licenses

This section lists open source libraries used in this SDK. 

| Library       | Source                                                        |
| ------------- | ------------------------------------------------------------- |
| `aws-sdk`     | Apache License 2.0 (https://www.npmjs.com/package/aws-sdk)    |
| `log4js`      | Apache License 2.0 (https://www.npmjs.com/package/log4js)     |
| `querystring` | MIT License (https://www.npmjs.com/package/query-string)      |

[↑ Top](#readme)
