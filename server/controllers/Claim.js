const claimService = require('../services/claimService');


exports.getEstimatedClaims = async (req, res) => {
  res.send({
    status: 'OK',
    message: 'data has been fetched verified',
    data: [

        {
          id:123,
          fcId: 'ABCD123',
          claimType: "Estimated",
          createdAt: "2019-08-08",
          dateOfServiceFrom: "2019-06-15",
          dateOfServiceTo: "2019-06-17",
          provider: {
            name: "Provider name",
            npi: "AASD1234"
          },
          coPay: 100,
          deductible: 200,
          coInsurance: 50,
          selfPay: 50,
          total: 300
        },
        {
          id:124,
          fcId: 'ABCD124',
          claimType: "Estimated",
          createdAt: "2019-07-12",
          dateOfServiceFrom: "2019-05-15",
          dateOfServiceTo: "2019-05-17",
          provider: {
            name: "Provider new name",
            npi: "AASD1235"
          },
          coPay: 100,
          deductible: 200,
          coInsurance: 50,
          selfPay: 50,
          total: 300
        },
        {
          id:125,
          fcId: 'ABCD125',
          claimType: "Estimated",
          createdAt: "2019-07-13",
          dateOfServiceFrom: "2019-06-10",
          dateOfServiceTo: "2019-06-12",
          provider: {
            name: "Provider another name",
            npi: "AASD1236"
          },
          coPay: 100,
          deductible: 200,
          coInsurance: 50,
          selfPay: 50,
          total: 300
        }
    ]
  });
};

exports.getFinalClaims = async (req, res) => {
  res.send({
    status: 'OK',
    message: 'data has been fetched verified',
    data: [
      {
        id:123,
        claimType: "Final",
        createdAt: "2019-08-08",
        dateOfServiceFrom: "2019-06-15",
        dateOfServiceTo: "2019-06-17",
        provider: {
          name: "Provider name",
          npi: "AASD1234"
        },
        daysLeft: 25,
        heartFlag: true,
        estimatedCoPay: 500,
        finalCoPay: 600,
        diffCoPay: -100,
        estimatedDeductible: 1000,
        finalDeductible: 800,
        diffDeductible: 200,
        estimatedCoInsurance: 900,
        finalCoInsurance: 1000,
        diffCoInsurance: -100,
        estimatedSelfPay: 1200,
        finalSelfPay: 1000,
        diffSelfPay: 200,
        estimatedAdjustments: 0,
        finalAdjustments: 1500,
        diffAdjustments: -1500,
        claimDescription: "some description text goes here",
        notes: "Here goes some notes for claim"
      },
      {
        id:124,
        claimType: "Final",
        createdAt: "2019-08-15",
        dateOfServiceFrom: "2019-06-20",
        dateOfServiceTo: "2019-06-21",
        provider: {
          name: "Provider name",
          npi: "AASD1234"
        },
        daysLeft: 15,
        heartFlag: true,
        estimatedCoPay: 500,
        finalCoPay: 600,
        diffCoPay: -100,
        estimatedDeductible: 1000,
        finalDeductible: 800,
        diffDeductible: 200,
        estimatedCoInsurance: 900,
        finalCoInsurance: 1000,
        diffCoInsurance: -100,
        estimatedSelfPay: 1200,
        finalSelfPay: 1000,
        diffSelfPay: 200,
        estimatedAdjustments: 0,
        finalAdjustments: 1500,
        diffAdjustments: -1500,
        claimDescription: "some description text goes here",
        notes: "Here goes some notes for claim"
      }
    ]
  });
};



exports.getClaims = async (req, res) => {
  res.send({
    status: 'OK',
    message: 'data has been fetched verified',
    data: [
      {
        PatientId: res.body.PatientId,
        ProviderId: 999,
        claimType: res.body.claimType,
        coPay: 12,
        deductible: 12,
        coInsurance: 12,
        selfPay: 12,
        total: 12,
        isOutOfNetwork: false,
        isApprovedByPatient: false,
        approvedByPatientTime: null,
        providerGenratedId: 'ACBD1234',
        insuranceGenratedId: 'XYZ1234',
        dateOfServiceFrom: '2019-10-12',
        dateOfServiceTo: '2019-10-14',
        outOfNetwork: 12,
        notCovered: 12,
        noPriorAuthorization: 12,
        denied: 12,
        charity: 12,
        writeOff: 12,
        rebate: 12,
        coupon: 12,
        other: 12,
        status: Default,
        notes: 'Some notes',
        unbundlling: 'abcd',
        duplicate: 'abcd',
        billed: 'abcd',
        approved: 'abcd',
        contractAssignment: 'abcd',
        billingEntityNpi: 'abcd',
        BillingEntityId: 'abcd',
        isActive: true,
        isPaid: false,
        paidAmount: 50,
        balanceAmount: 100
      }
    ]
  });
  // const result = await claimService.addRecord(req.body);
  // res.send(result);
};

exports.addEstimated = async (req, res) => {
  // res.send({
  //   "status": "OK",
  //   "message": "Data submited successfully"
  // });
  const result = await claimService.addEstimatedClaim(req.body);
  res.send(result);
};

exports.addFinal = async (req, res) => {
  // res.send({
  //   "status": "OK",
  //   "message": "Data submited successfully"
  // });
  const result = await claimService.addFinalClaim(req.body);
  res.send(result);
};

exports.updateFinal = async (req, res) => {
  // res.send({
  //   "status": "OK",
  //   "message": "Data submited successfully"
  // });
  console.log('Claim - controller - updateFinal()');
  const result = await claimService.updateFinalClaim(req.body);
  res.send(result);
};

exports.updateEstimated = async (req, res) => {
  console.log('ClaimController -- updateEstimated()');
  // res.send({
  //   "status": "OK",
  //   "message": "Data submited successfully"
  // });
  const result = await claimService.updateEstimatedClaim(req.body);
  res.send(result);
};

exports.deleteEstimated = async (req, res) => {
  res.send({
    status: 'OK',
    message: 'Data deleted successfully'
  });
  // const result = await claimService.deleteRecord(req.body);
  // res.send(result);
};

exports.search = async (req, res) => {
  res.send({
    status: 'OK',
    message: 'data has been fetched verified',
    data: [
      {
        PatientId: 888,
        ProviderId: 999,
        claimType: 'Estimated',
        coPay: 12,
        deductible: 12,
        coInsurance: 12,
        selfPay: 12,
        total: 12,
        isOutOfNetwork: false,
        isApprovedByPatient: false,
        approvedByPatientTime: null,
        providerGenratedId: 'ACBD1234',
        insuranceGenratedId: 'XYZ1234',
        dateOfServiceFrom: '2019-10-12',
        dateOfServiceTo: '2019-10-14',
        outOfNetwork: 12,
        notCovered: 12,
        noPriorAuthorization: 12,
        denied: 12,
        charity: 12,
        writeOff: 12,
        rebate: 12,
        coupon: 12,
        other: 12,
        status: Default,
        notes: 'Some notes',
        unbundlling: 'abcd',
        duplicate: 'abcd',
        billed: 'abcd',
        approved: 'abcd',
        contractAssignment: 'abcd',
        billingEntityNpi: 'abcd',
        BillingEntityId: 'abcd',
        isActive: true,
        isPaid: false,
        paidAmount: 50,
        balanceAmount: 100
      }
    ]
  });
  // const result = await claimService.addRecord(req.body);
  // res.send(result);
};




exports.getSingleEstimatedClaim = async (req, res) => {
  res.send({
    status: 'OK',
    message: 'data has been fetched verified',
    data: {
      id:124,
      fcId: 'ABCD124',
      claimType: "Estimated",
      createdAt: "2019-07-12",
      dateOfServiceFrom: "2019-05-15",
      dateOfServiceTo: "2019-05-17",
      provider: {
        name: "Provider new name",
        npi: "AASD1235"
      },
      coPay: 100,
      deductible: 200,
      coInsurance: 50,
      selfPay: 50,
      total: 300,
      paidAmount: 50,
      balanceAmount: 100,
      paymentHistory:[
        {dueAmount: 100, paidAmount: 90, date: "2019-08-01"},
        {dueAmount: 100, paidAmount: 60, date: "2019-09-01"},
      ]
    }
  });
  // const result = await claimService.addRecord(req.body);
  // res.send(result);
};

exports.getSingleFinalClaim = async (req, res) => {
  res.send({
    status: 'OK',
    message: 'data has been fetched verified',
    data: {
      id:123,
      fcId:"ABCD123",
      claimType: "Final",
      createdAt: "2019-08-08",
      dateOfServiceFrom: "2019-06-15",
      dateOfServiceTo: "2019-06-17",
      provider: {
        name: "Provider name",
        npi: "AASD1234"
      },
      daysLeft: 25,
      heartFlag: true,
      estimatedCoPay: 500,
      finalCoPay: 600,
      diffCoPay: -100,
      estimatedDeductible: 1000,
      finalDeductible: 800,
      diffDeductible: 200,
      estimatedCoInsurance: 900,
      finalCoInsurance: 1000,
      diffCoInsurance: -100,
      estimatedSelfPay: 1200,
      finalSelfPay: 1000,
      diffSelfPay: 200,
      estimatedAdjustments: 0,
      finalAdjustments: 1500,
      diffAdjustments: -1500,
      claimDescription: "some description text goes here",
      notes: "Here goes some notes for claim",
      paymentHistory:[
        {dueAmount: 100, paidAmount: 90, date: "2019-08-01"},
        {dueAmount: 100, paidAmount: 60, date: "2019-09-01"},
      ],
      subClaims:[
        {
          id:234,
          fcId:"ABCD234",
          claimType: "Final",
          createdAt: "2019-08-08",
          dateOfServiceFrom: "2019-06-15",
          dateOfServiceTo: "2019-06-17",
          provider: {
            name: "Provider name",
            npi: "AASD1234"
          },
          daysLeft: 25,
          heartFlag: true,
          estimatedCoPay: 500,
          finalCoPay: 600,
          diffCoPay: -100,
          estimatedDeductible: 1000,
          finalDeductible: 800,
          diffDeductible: 200,
          estimatedCoInsurance: 900,
          finalCoInsurance: 1000,
          diffCoInsurance: -100,
          estimatedSelfPay: 1200,
          finalSelfPay: 1000,
          diffSelfPay: 200,
          estimatedAdjustments: 0,
          finalAdjustments: 1500,
          diffAdjustments: -1500,
          claimDescription: "some description text goes here",
          notes: "Here goes some notes for claim",
        },
        {
          id:235,
          fcId:"ABCD235",
          claimType: "Final",
          createdAt: "2019-08-08",
          dateOfServiceFrom: "2019-06-15",
          dateOfServiceTo: "2019-06-17",
          provider: {
            name: "Provider name",
            npi: "AASD1234"
          },
          daysLeft: 25,
          heartFlag: true,
          estimatedCoPay: 500,
          finalCoPay: 600,
          diffCoPay: -100,
          estimatedDeductible: 1000,
          finalDeductible: 800,
          diffDeductible: 200,
          estimatedCoInsurance: 900,
          finalCoInsurance: 1000,
          diffCoInsurance: -100,
          estimatedSelfPay: 1200,
          finalSelfPay: 1000,
          diffSelfPay: 200,
          estimatedAdjustments: 0,
          finalAdjustments: 1500,
          diffAdjustments: -1500,
          claimDescription: "some description text goes here",
          notes: "Here goes some notes for claim",
        }
      ]
    }
  });
  // const result = await claimService.addRecord(req.body);
  // res.send(result);
};
