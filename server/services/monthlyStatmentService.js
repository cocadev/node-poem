const models = require('../models');
const monthlyStatementDetailService = require('./monthlyStatementDetailService.js');
const moment = require('moment');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

const genrateStatment = async PatientId => {
  var tableParams = {
    PatientId: PatientId, statmentDate: moment().format('YYYY-MM-DD HH:ss'),
    dueDate: moment().add(10, 'days').format('YYYY-MM-DD HH:ss'), totalAmount: 0,
    prePay_this_statment: 0, prePay_paid: 0, prePay_due: 0, prePay_available: 0,
    ppi_this_statment: 0, ppi_paid: 0, ppi_due: 0, ppi_available: 0,
    buffer_this_statment: 0, buffer_paid: 0, buffer_due: 0, buffer_available: 0,
    lateFees_this_statment: 0, lateFees_paid: 0, lateFees_due: 0, lateFees_available: 0,
    intrest_this_statment: 0, intrest_paid: 0, intrest_due: 0, intrest_available: 0,
    finalClaim_this_statment: 0, finalClaim_paid: 0, finalClaim_due: 0, finalClaim_available: 0,
    finalClaim90days_this_statment: 0, finalClaim90days_paid: 0, finalClaim90days_due: 0, finalClaim90days_available: 0,
    estimatedClaim_this_statment: 0, estimatedClaim_paid: 0, estimatedClaim_due: 0, estimatedClaim_available: 0,
  };

  console.log("MonthlyStatement Service - genrateStatment(): "+ PatientId);
/*
var thisStatment = await models.sequelize.query(`
  SELECT
    "AT"."id", "AT"."title", SUM("AI"."amount") AS "Amount"
  FROM
    "ActivityTypes" AS "AT" LEFT JOIN
    (
      SELECT
        "A2"."ActivityTypeId", "AI2"."ActivityId", "AI2"."id" AS "ActivityInstallmentId",
        "AI2"."amount", "A2"."PatientId"
      FROM
        "Activities" AS "A2" JOIN "ActivityInstallments" AS "AI2"
        ON "A2"."id" = "AI2"."ActivityId" AND "AI2"."isActive" = true AND "AI2"."isPaid" =  false AND
          "AI2"."PatientId" = (:PatientId)
    ) AS "AI"
  ON
      "AT"."id" = "AI"."ActivityTypeId"
  GROUP BY "AT"."id", "AT"."title"
`, {
  replacements: {PatientId: PatientId},
  type: models.sequelize.QueryTypes.SELECT
});
*/
var thisStatment = await models.sequelize.query(`
  SELECT
    "AT"."id", "AT"."title", SUM("vAD"."InstallmentAmount") AS "Amount"
  FROM
    "ActivityTypes" AS "AT" LEFT JOIN "viewActivityDetails" AS "vAD"
    ON
      "AT"."id" = "vAD"."ActivityTypeId" AND "vAD"."PatientId" = (:PatientId) AND
      "vAD"."isActivityActive" = true AND "vAD"."isInstallmentPaid" = false
  GROUP BY "AT"."id", "AT"."title"
`, {
  replacements: {PatientId: PatientId},
  type: models.sequelize.QueryTypes.SELECT
});
  tableParams.totalAmount = _.sumBy(thisStatment, function(o) { return o.Amount; });
  console.log("Total amount is : "+ tableParams.totalAmount);
  await thisStatment.map(x => {
    switch(x.id) {
      case 3:
        tableParams.ppi_this_statment = _.isNull(x.Amount) ? 0 : x.Amount ;
        break;
      case 4:
        tableParams.prePay_this_statment = _.isNull(x.Amount) ? 0 : x.Amount;
        break;
      case 5:
        tableParams.estimatedClaim_this_statment = _.isNull(x.Amount) ? 0 : x.Amount;
        break;
      case 6:
        tableParams.finalClaim_this_statment = _.isNull(x.Amount) ? 0 : x.Amount;
        break;
      case 7:
        tableParams.lateFees_this_statment = _.isNull(x.Amount) ? 0 : x.Amount;
        break;
      case 8:
        tableParams.intrest_this_statment = _.isNull(x.Amount) ? 0 : x.Amount;
        break;
    }
  });
/*
  var toDate = await models.sequelize.query(`
    SELECT
      "AT"."id", "AT"."title", SUM("AI"."amountPaid") AS "Paid"
    FROM
      "ActivityTypes" AS "AT" LEFT JOIN
      (
        SELECT
          "A2"."ActivityTypeId", "AI2"."ActivityId", "AI2"."id" AS "ActivityInstallmentId",
          "AI2"."amountPaid", "A2"."PatientId"
        FROM
          "Activities" AS "A2" JOIN "ActivityInstallments" AS "AI2"
          ON "A2"."id" = "AI2"."ActivityId" AND "AI2"."PatientId" = (:PatientId)
      ) AS "AI"
    ON
        "AT"."id" = "AI"."ActivityTypeId"
    GROUP BY "AT"."id", "AT"."title"
  `, {
    replacements: {PatientId: PatientId},
    type: models.sequelize.QueryTypes.SELECT
  });
*/
  var toDate = await models.sequelize.query(`
    SELECT
      "AT"."id", "AT"."title", SUM("vAD"."ActivityPaidAmount") AS "Paid", SUM("vAD"."ActivityBalanceAmount") AS "amountDue"
    FROM
      "ActivityTypes" AS "AT" LEFT JOIN "viewActivityDetails" AS "vAD"
      ON
        "AT"."id" = "vAD"."ActivityTypeId" AND "vAD"."PatientId" = (:PatientId) AND
        "vAD"."isActivityActive" = true
    GROUP BY "AT"."id", "AT"."title"
  `, {
    replacements: {PatientId: PatientId},
    type: models.sequelize.QueryTypes.SELECT
  });
  await toDate.map(x => {
    switch(x.id) {
      case 3:
        tableParams.ppi_paid = _.isNull(x.Paid) ? 0 : x.Paid;
        tableParams.ppi_due = _.isNull(x.amountDue) ? 0 : x.amountDue;
        break;
      case 4:
        tableParams.prePay_paid = _.isNull(x.Paid) ? 0 : x.Paid;
        tableParams.prePay_due = _.isNull(x.amountDue) ? 0 : x.amountDue;
        break;
      case 5:
        tableParams.estimatedClaim_paid = _.isNull(x.Paid) ? 0 : x.Paid;
        tableParams.estimatedClaim_due = _.isNull(x.amountDue) ? 0 : x.amountDue;
        break;
      case 6:
        tableParams.finalClaim_paid = _.isNull(x.Paid) ? 0 : x.Paid;
        tableParams.finalClaim_due = _.isNull(x.amountDue) ? 0 : x.amountDue;
        break;
      case 7:
        tableParams.lateFees_paid = _.isNull(x.Paid) ? 0 : x.Paid;
        tableParams.lateFees_due = _.isNull(x.amountDue) ? 0 : x.amountDue;
        break;
      case 8:
        tableParams.intrest_paid = _.isNull(x.Paid) ? 0 : x.Paid;
        tableParams.intrest_due = _.isNull(x.amountDue) ? 0 : x.amountDue;
        break;
    }
  });

  return addRecord(tableParams)
    .then(monthlyStatment => {
      monthlyStatementDetailService.addStatmentDetails(PatientId, monthlyStatment.id);
      return monthlyStatment;
    })
    .catch(error => {
      return { status: "ERROR", content: error };
    });
};


const addRecord = payload => {
  return new Promise((resolve, reject) => {
    models.MonthlyStatement.create(payload)
      .then(returnObject => {
        resolve(returnObject);
      })
      .catch(error => {
        reject(error);
      });
  });
};


module.exports = {
  genrateStatment, addRecord
};






/*
CREATE TYPE typPatients as (id INT, UserId INT, email VARCHAR, name VARCHAR );

CREATE OR REPLACE FUNCTION getPatients() RETURNS SETOF typPatients AS $$

   BEGIN
      RETURN QUERY SELECT id, "UserId", "email", "name" FROM "Patients";
   END; $$

   LANGUAGE 'plpgsql';

DROP FUNCTION getPatients

CREATE OR REPLACE FUNCTION show_cities() RETURNS refcursor AS $$
   DECLARE
     ref refcursor;
   BEGIN
     OPEN ref FOR SELECT city, state FROM cities;
     RETURN ref;
   END;
   $$ LANGUAGE plpgsql;


CREATE TYPE typMonthlyStatment as (id INT, UserId INT, email VARCHAR, name VARCHAR );

CREATE OR REPLACE FUNCTION getMonthlyStatment (PatientId INT, statementYear INT, statementMonth INT)
   RETURNS TABLE (
      film_title VARCHAR,
      film_release_year INT
)
AS $$
BEGIN
   RETURN QUERY SELECT
      title,
      cast( release_year as integer)
   FROM
      film
   WHERE
      title ILIKE p_pattern ;
END; $$

LANGUAGE 'plpgsql';
*/
