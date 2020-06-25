const models = require('../models');
const moment = require('moment');
const axios = require('axios');
const jwt = require('jsonwebtoken');

const setPatient = payload => {
  return new Promise((resolve, reject) => {
      axios({
        method: 'put',
        url: 'http://ec2-18-219-59-158.us-east-2.compute.amazonaws.com:9200/patient/_doc/'+payload.id,
        data: payload
      })
      .then(function (response) {
        resolve(response.data);
      })
      .catch(error => {
        console.dir(error);
        reject({ status: 400, message: 'Kindly try again', content: error });
      });
  });
};

const searchPatient = payload => {
  return new Promise((resolve, reject) => {
    var qs = {
        query : {
            match : payload
        }
    };
    axios({
      method: 'get',
      url: 'http://ec2-18-219-59-158.us-east-2.compute.amazonaws.com:9200/patient/_search?pretty=false',
      data: qs,
    })
      .then(function (response) {
        resolve(response.data);
      })
      .catch(error => {
        reject({ status: 400, message: 'Kindly try again', content: error });
      });
  });
};

const setProvider = payload => {
  return new Promise((resolve, reject) => {
      axios({
        method: 'put',
        url: 'http://ec2-18-219-59-158.us-east-2.compute.amazonaws.com:9200/provider/_doc/'+payload.id,
        data: payload
      })
      .then(function (response) {
        resolve(response.data);
      })
      .catch(error => {
        reject({ status: 400, message: 'Kindly try again', content: error });
      });
  });
};

const searchProvider = payload => {
  return new Promise((resolve, reject) => {
    var qs = {
        query : {
            match : payload
        }
    };
    axios({
      method: 'get',
      url: 'http://ec2-18-219-59-158.us-east-2.compute.amazonaws.com:9200/provider/_search?pretty=false',
      data: qs,
    })
      .then(function (response) {
        resolve(response.data);
      })
      .catch(error => {
        reject({ status: 400, message: 'Kindly try again', content: error });
      });
  });
};


module.exports = {
  setPatient, setProvider, searchPatient
};
