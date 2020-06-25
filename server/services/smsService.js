const { RelayClient } = require('@signalwire/node');

/*
let client = new RelayClient({
  project: '567bbe73-8327-4f83-82b1-7529588c46e4',
  token: 'PT2275847049706e5e21cb7784895d28821f0a0fd67af632a5'
});
*/
// client
//   .on('signalwire.ready', async nclient => {
//     // Your client is ready!
//     //client = nclient;
//   })
//   .on('signalwire.error', error => {
//     // Got an error...
//     throw error;
//   });
// client.disconnect();
async function sendSMS(smsOptions) {
  try {
    // const sendResult = await client.messaging.send({
    //   context: 'office',
    //   from: smsOptions.from,
    //   to: smsOptions.to,
    //   body: smsOptions.text
    // });

    // if (sendResult.successful) {
    //   console.log('Message ID: ', sendResult.messageId);
    // }
    // console.log(sendResult);

    // await client.connect();
    client
      .on('signalwire.ready', async client => {
        // Your client is ready!
        const sendResult = await client.messaging.send({
          context: 'office',
          from: smsOptions.from,
          to: smsOptions.to,
          body: smsOptions.text
        });

        if (sendResult.successful) {
          console.log('Message ID: ', sendResult.messageId);
        }
        client.disconnect();
        return sendResult;
      })
      .on('signalwire.error', error => {
        // Got an error...
        throw error;
      });

    // return info.messageId;
  } catch (e) {
    throw e;
  }
}

async function sendSMSWithType(user, number, type, data) {
  try {
    const smsOptions = {
      from: '+12012673653',
      to: number
    };
    switch (type) {
      case 'Test_SMS':
        const template = `Hello, ${user.name}. Welcome to POEM`;
        smsOptions.text = template;
        await sendSMS(smsOptions);
        break;

      default:
        smsOptions.text = 'Default SMS';
        await sendSMS(smsOptions);
    }
  } catch (e) {
    throw e;
  }
}

module.exports = {
  sendSMS,
  sendSMSWithType
};
