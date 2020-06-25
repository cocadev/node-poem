const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../app');

const { expect } = chai;

chai.use(chaiHttp);

const context = {
  server: chai.request(app).keepOpen()
};

describe('Patient Sign Up Test', () => {
  describe('Generate OTP Endpoint', () => {
    const generateOTP = data => context.server.post('/patient/get-otp').send(data);
    // To check if valid response is sent while get otp is called
    it.only('checks if valid OTP is generated', async () => {
      const payload = {
        mobileNumber: 9537122172
      };
      const successResponse = {
        status: 'OK',
        message: 'OTP has been sent successfully'
      };
      const result = await generateOTP(payload);
      expect(result.status).to.equal(200);
      expect(result.body).to.deep.equal(successResponse);
    });

    // Should give validation error when mobile is < 10 digits length
    it('checks if mobile number is number', async () => {
      const payload = {
        mobile: 953712217
      };
      const result = await generateOTP(payload);
      expect(result.status).to.equal(500);
    });

    // Should give validation error when mobile is alphabetic string
    it('checks if mobile is not alphabetic', async () => {
      const payload = {
        mobile: 'abc'
      };
      const result = await generateOTP(payload);
      expect(result.status).to.equal(500);
    });
  });
});
