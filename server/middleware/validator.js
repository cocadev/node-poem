const assert = require('assert');

const isTruthy = val => val !== null && val !== undefined;

exports.validateBody = schema => async (req, res, next) => {
  assert.equal(isTruthy(schema), true);
  assert.equal(isTruthy(schema.validate), true);
  try {
    await schema.validate(req.body);
    next();
  } catch (err) {
    next(err);
  }
};
