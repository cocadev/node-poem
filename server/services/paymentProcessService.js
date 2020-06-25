const stripe = require("stripe")("sk_test_Aw9kBylY43tIPm5oLHKdMzBt");


const RegisterCustomer = async (customerData) => {
    try {
        let customer = await stripe.customers.create(customerData);
        return customer;
    } catch (err) {
        console.log(err)
        throw err
    }
}

const ListCustomers = async (filter) => {
    try {
        return await stripe.customers.list(filter);
    } catch (err) {
        console.log(err);
        throw err
    }
}

const AddCreditCardToCustomer = async (customerID, creditCardData, isDefault = false) => {
    let cardToken = await _registerCreditCard(creditCardData);
    let result = await _addPaymentMethod(customerID, cardToken, isDefault)
    return result
}

const AddBankAccountToCustomer = async (customerID, bankAccountData, isDefault = false) => {
    let bankToken = await _registerBankAccount(bankAccountData);
    let result = await _addPaymentMethod(customerID, bankToken, isDefault)
    return result
}

const ProcessPayment = async (paymentData) => {
    //return await transactionApi.processPayment(paymentData);
    try {
        console.log(paymentData)
        return await stripe.charges.create(paymentData);
    } catch(err) {
        console.log(err)
        throw err
    }
}

const ProcessPayments = async (paymentArray) => {
    // return await transactionApi.processPayments(paymentArray)
    let resposeArray = [];
    await paymentArray.array.forEach(async paymentElement => {
        let paymentRes = processPayment(paymentElement);
        resposeArray.push(paymentRes)
    });
    return resposeArray;
}

const RefundPayment = async (chargeID) => {
    //return await transactionApi.refundPayment(chargeID);
    try {
        let refund = await stripe.refunds.create({charge: chargeID});
        return refund
    } catch (err) {
        console.log(err)
        throw err
    }
}

const ListCharges = async (customerID) => {
    // return await transactionApi.listTransactions(customerId);
    try {
        let transactions = await stripe.charges.list({
            customer: customerID
        })
        return transactions
    } catch (err) {
        console.log(err)
        throw err
    }
}





////////////////////////////////////////////////////////////////////////////////////////////////
const _updateCustomer = async (customerID ,updatedData) => {
    try {
        let customer = await stripe.customers.update(customerID, updatedData)
        return customer;
    } catch (err) {
        console.log(err)
        throw err
    }
}

const _retrieveCustomer = async (customerID) => {
    try {
        let customer = await stripe.customers.retrieve(customerID)
        return customer
    } catch (err) {
        console.log(err)
        throw err
    }
}

const _registerCreditCard = async (cardData) => {
    try {
        let token = await stripe.tokens.create({ card: cardData });
        return token.id
    }
    catch (err){
        console.log(err)
        throw err
    }
}

const _registerBankAccount = async (bankData) => {
    try {
        let token = await stripe.tokens.create({ bank_account: bankData })
        return token.id
    } catch(err) {
        console.log(err)
    }
}

const _addPaymentMethod = async (customerID, cardToken, isDefault = false) => {
    try {
        let source = await stripe.customers.createSource(customerID, { source: cardToken });
        if (isDefault) {
            await stripe.customers.update(customerID, {default_source: source.id })
        }
        return source
    } catch (err) {
        console.log(err)
        throw err
    }
}

const _registerCreditCard = async (cardData) => {
    try {
        let token = await stripe.tokens.create({ card: cardData });
        return token.id
    }
    catch (err){
        console.log(err)
        throw err
    }
}

const _registerBankAccount = async (bankData) => {
    try {
        let token = await stripe.tokens.create({ bank_account: bankData })
        return token.id
    } catch(err) {
        console.log(err)
    }
}

module.exports = {
    registerCreditCard: registerCreditCard,
    registerBankAccount: registerBankAccount
}
