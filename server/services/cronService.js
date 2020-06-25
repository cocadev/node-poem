const schedule = require('node-schedule');

async function scheduleJob(date, type) {
  try {
    switch (type) {
      case 'Test_Job':
        schedule.scheduleJob(date, function() {
          console.log('The world is going to end today.');
        });
        break;

      default:
        schedule.scheduleJob(date, function() {
          console.log('The world is going to end today.');
        });        
    }
  } catch (e) {
    throw e;
  }
}

module.exports = {
  scheduleJob
};
