const stripe = require('stripe')('sk_test_YhDlloBiKqj08XVDnr7H0hXK00v37XYsXn');

async function createCustomerOnStripe(user, description, source) {
  try {
    const createCustomer = await stripe.customers.create({
      name: user.name,
      description,
      email: user.email,
      source // obtained with Stripe.js
    });
    return createCustomer;
  } catch (e) {
    throw e;
  }
}

async function getCustomerFromStripe(stripeCustomerId) {
  try {
    const getCustomer = await stripe.customers.retrieve(stripeCustomerId);
    return getCustomer;
  } catch (e) {
    throw e;
  }
}

async function updateCustomerForStripe(stripeCustomerId, data) {
  try {
    const updateCustomer = await stripe.customers.retrieve(stripeCustomerId, data);
    return updateCustomer;
  } catch (e) {
    throw e;
  }
}

async function chargeCustomerOnStripe(payload) {
  try {
    const chargeCustomer = await stripe.charges.create({
      amount: payload.amount,
      currency: payload.currency,
      //  source: payload.source,
      description: payload.description,
      customer: payload.customerId
    });
    return chargeCustomer;
  } catch (e) {
    throw e;
  }
}

async function createCardTokenOnStripe(payload) {
  try {
    const createCardToken = await stripe.tokens.create({
      card: {
        number: payload.number,
        exp_month: payload.exp_month,
        exp_year: payload.exp_year,
        cvc: payload.cvc
      },
      customer: payload.customerId
    });
    return createCardToken;
  } catch (e) {
    throw e;
  }
}

async function createBankTokenOnStripe(payload) {
  try {
    const createBankToken = await stripe.tokens.create({
      bank_account: {
        country: payload.country,
        currency: payload.currency,
        account_holder_name: payload.accountHolderName,
        account_holder_type: payload.accountHolderType,
        routing_number: payload.routingNumber,
        account_number: payload.accountNumber
      },
      customer: payload.customerId
    });
    return createBankToken;
  } catch (e) {
    throw e;
  }
}

async function createCheckOutSessionOnStripe(payload) {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: payload.paymentMethodTypes,
      line_items: payload.lineItems,
      success_url: payload.successUrl,
      cancel_url: payload.cancelUrl
    });
    return session;
  } catch (e) {
    throw e;
  }
}

async function createCustomerInvoiceOnStripe(payload) {
  try {
    const customerInvoice = await stripe.invoices.create({
      customer: payload.customer,
      custom_fields: payload.customFields,
      // days_until_due: payload.days_until_due,
      // due_date: payload.due_date,
      description: payload.description
    });
    return customerInvoice;
  } catch (e) {
    console.log(e)
    throw e;
  }
}

module.exports = {
  createCustomerOnStripe,
  getCustomerFromStripe,
  updateCustomerForStripe,
  chargeCustomerOnStripe,
  createCardTokenOnStripe,
  createBankTokenOnStripe,
  createCheckOutSessionOnStripe,
  createCustomerInvoiceOnStripe
};
