/* eslint-disable func-names */
const paymentService = require('../services/paymentService');

exports.createCustomerOnStripe = async (req, res) => {
  const result = await paymentService.createCustomerOnStripe(
    { name: 'muddassir', email: 'muddassir_92@hotmail.com' },
    'check',
    'tok_mastercard'
  );
  res.send(result);
};

exports.getCustomerFromStripe = async (req, res) => {
  const result = await paymentService.getCustomerFromStripe('cus_FePiwblvSXVvJF');
  res.send(result);
};

exports.chargeCustomerOnStripe = async (req, res) => {
  const result = await paymentService.chargeCustomerOnStripe({
    amount: 50,
    currency: 'usd',
    source: 'tok_mastercard',
    description: 'test payment',
    customerId: 'cus_FePiwblvSXVvJF'
  });
  res.send(result);
};

exports.createCardTokenOnStripe = async (req, res) => {
  const result = await paymentService.createCardTokenOnStripe({
    number: '4242424242424242',
    exp_month: 12,
    exp_year: 2020,
    cvc: '123',
    customerId: 'cus_FePiwblvSXVvJF'
  });
  res.send(result);
};

exports.createCardTokenOnStripe = async (req, res) => {
  const result = await paymentService.createCardTokenOnStripe({
    number: '4242424242424242',
    exp_month: 12,
    exp_year: 2020,
    cvc: '123',
    customerId: 'cus_FePiwblvSXVvJF'
  });
  res.send(result);
};

exports.createBankTokenOnStripe = async (req, res) => {
  const result = await paymentService.createBankTokenOnStripe({
    country: 'US',
    currency: 'usd',
    account_holder_name: 'Jenny Rosen',
    account_holder_type: 'individual',
    routing_number: '110000000',
    account_number: '000123456789',
    customerId: 'cus_FePiwblvSXVvJF'
  });
  res.send(result);
};

exports.createCheckOutSessionOnStripe = async (req, res) => {
  const result = await paymentService.createCheckOutSessionOnStripe({
    paymentMethodTypes: ['card'],
    lineItems: [
      {
        name: 'T-shirt',
        description: 'Comfortable cotton t-shirt',
        images: ['https://example.com/t-shirt.png'],
        amount: 500,
        currency: 'usd',
        quantity: 1
      }
    ],
    successUrl: 'https://google.com/',
    cancelUrl: 'https://bbc.com/'
  });
  res.send(result);
};

exports.createCustomerInvoiceOnStripe = async (req, res) => {
  const result = await paymentService.createCustomerInvoiceOnStripe({
    customer: 'cus_FePiwblvSXVvJF',
    customFields: [{ name: 'PrePay', value: 300 }],
    description: 'Test Invoice'
  });
  res.send(result);
};
