const nacl = require('tweetnacl');
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');
const relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.tz.setDefault("America/Los_Angeles");

exports.handler = async (event) => {
  console.log(event)
  console.log(event.headers)
  // Checking signature (requirement 1.)
  // Your public key can be found on your application in the Developer Portal
  const PUBLIC_KEY = process.env.PUBLIC_KEY;
  const signature = event.headers['x-signature-ed25519'];
  const timestamp = event.headers['x-signature-timestamp'];
  const strBody = event.body; // should be string, for successful sign

  const isVerified = nacl.sign.detached.verify(
    Buffer.from(timestamp + strBody),
    Buffer.from(signature, 'hex'),
    Buffer.from(PUBLIC_KEY, 'hex')
  );

  if (!isVerified) {
    console.log('401 CODE')
    return {
      statusCode: 401,
      body: JSON.stringify('invalid request signature'),
    };
  }


  // Replying to ping (requirement 2.)
  const body = JSON.parse(strBody)
  if (body.type == 1) {
    console.log('200 CODE')
    return {
      statusCode: 200,
      body: JSON.stringify({ "type": 1 }),
    }
  }

  // Handle /foo Command
  if (body.data.name == 'foo') {
    console.log('HAPPY RESPONSE')
    return JSON.stringify({  // Note the absence of statusCode
      "type": 4,  // This type stands for answer with invocation shown
      "data": { "content": "bar" }
    })
  }

  // Handle /jpcountdown Command
  const currentDate = dayjs.tz();
  const tripStart = dayjs.tz('2022-12-30 00:00');
  const tripHasStarted = dayjs().isBefore(tripStart)

  const countDown = () => {
    if (!tripHasStarted) {
      return 'Count down finished'
    };
    const daysLeft = tripStart.diff(currentDate, 'days')
    return `${daysLeft + 1} day(s) left until Japan trip!`
  }

  if (body.data.name == 'jpcountdown')
    return JSON.stringify({  // Note the absence of statusCode
      "type": 4,  // This type stands for answer with invocation shown
      "data": { "content": countDown() }
    })


  console.log('Reach end of file :(')
  return {
    statusCode: 404  // If no handler implemented for Discord's request
  }
};

/*

*/