const nacl = require('tweetnacl');
const dayjs = require('dayjs');
const relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);

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
  const currentTime = dayjs().subtract(7, 'h');
  const tripStart = dayjs('2022-12-30 00:00');
  // console.log(`Current date/time: ${currentTime.format('MM/DD/YYYY HH:mm')}`)
  // console.log('Trip start:', tripStart.format('MM/DD/YYYY HH:mm'))
  
  const tripHasStarted = dayjs().isBefore(tripStart);
  
  const countDown = () => {
      if (!tripHasStarted) {
          return 'Count down finished'
      };
      const daysLeft = tripStart.diff(currentTime, 'days');
      return `Current date: ${currentTime.format('MM/DD/YYYY HH:mm')} \n${daysLeft + 1} day(s) left until Japan trip!`
  
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
TODO:
  Japan stuff:
    -Create a lambda function that runs once every Friday(this is the day of the departure flight), and tells us how many weeks left
    Create a slash command that returns the current exchange rate (try using this API https://exchangeratesapi.io/)
*/