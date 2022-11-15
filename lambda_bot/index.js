const nacl = require('tweetnacl');
const helper = require('./helper')

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
      "data": { "content": "did it" }
    })
  }

  // Handle /jp-countdown Command
  if (body.data.name == 'jp-countdown')
    return JSON.stringify({ 
      "type": 4, 
      "data": { "content": helper.countDown() }
    })

  // Handle /weeks-jp-countdown Command
  if (body.data.name == 'weeks-jp-countdown')
    return JSON.stringify({  
      "type": 4,  
      "data": { "content": helper.daysAndWeeksLeft() }
    })

  // Handle /USD-powerlevel Command
  if (body.data.name == 'current-exchange-rate'){
      return JSON.stringify({ 
        "type": 4,  
        "data": { "content": await helper.currentExchangeRate() }
      })
  }

  // Handle /Trip-info Command
  if (body.data.name == 'trip-info'){
      const info = `Flight date: Dec 30\n${helper.daysAndWeeksLeft()}\n${await helper.currentExchangeRate()}`
      return JSON.stringify({ 
        "type": 4,  
        "data": { "content": info }
      })
  }

  console.log('Reach end of file :(')
  return {
    statusCode: 404  // If no handler implemented for Discord's request
  }
};


/*
TODO:
  Japan stuff:
    -Create a lambda function that runs once every Friday(this is the day of the departure flight), and tells us how many weeks left
    - *DONE* Create a slash command that returns the current exchange rate (try using this API https://exchangeratesapi.io/)
*/