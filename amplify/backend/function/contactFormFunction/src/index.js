const { SESClient, SendEmailCommand } = require("@aws-sdk/client-ses");

// AWS_REGION is always set by the Lambda runtime; REGION comes from the Amplify
// CloudFormation template and keeps local invocation (amplify mock) working.
const ses = new SESClient({
  region: process.env.REGION || process.env.AWS_REGION,
});

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Headers":
          "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
        "Access-Control-Allow-Methods": "OPTIONS,POST",
      },
      body: JSON.stringify({ message: "CORS preflight request successful" }),
    };
  }
  const { name, email, message, topic } = JSON.parse(event.body);

  const receivingEmail = process.env.RECEIVING_EMAIL_ADDRESS;
  const subject = `New message from ${name} via contact form`;
  // `topic` is optional - the contact form does not currently send one
  const topicLine = topic ? `Topic: ${topic}\n` : "";
  const body = `Name: ${name}\nEmail: ${email}\n${topicLine}\nMessage:\n${message}`;

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
    await ses.send(new SendEmailCommand(params));
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({ message: "Email sent successfully" }),
    };
  } catch (error) {
    console.error("Error sending email:", error);
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({ error: "Error sending email" }),
    };
  }
};
