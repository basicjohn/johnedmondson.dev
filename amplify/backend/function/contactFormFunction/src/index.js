const AWS = require('aws-sdk');
const SES = new AWS.SES({ apiVersion: '2010-12-01' });

exports.handler = async (event) => {
  const { name, email, message, topic } = JSON.parse(event.body);

  const receivingEmail = process.env.RECEIVING_EMAIL_ADDRESS;
  const subject = `New message from ${name} via contact form`;
  const body = `Name: ${name}\nEmail: ${email}\nTopic: ${topic}\n\nMessage:\n${message}`;

  const params = {
    Source: receivingEmail,
    Destination: {
      ToAddresses: [receivingEmail],
    },
    Message: {
      Subject: {
        Data: subject,
      },
      Body: {
        Text: {
          Data: body,
        },
      },
    },
  };

  try {
    await SES.sendEmail(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Email sent successfully' }),
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error sending email' }),
    };
  }
};
