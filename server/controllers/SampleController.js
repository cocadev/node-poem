const models = require('../models/index');
const esearchService = require('../services/esearchService.js');
const activityService = require('../services/activityService.js');
const monthlyStatmentService = require('../services/monthlyStatmentService.js');
const installmentService = require('../services/installmentService.js');
const axios = require('axios');
//const curl = new (require( 'curl-request' ))();
const async = require('async');

const self = (module.exports = {
  getSample(req, res) {
    models.Todo.findAll({})
      .then(function(todos) {
        res.json(todos);
      })
      .catch(function(error) {
        res.status(500).send('Internal Server Error');
      });
  },

  setSample(req, res) {
console.log("got the call here setSample()")
    models.Todo.create({ title: 'some title 1' })
      .then(function(todos) {
        res.json(todos);
      })
      .catch(function(error) {
        res.status(500).send('Internal Server Error');
      });
  },


  genrateInstallments(req, res) {
    //activityService.getPatientActiveRecords(6).then(result => {
console.log("Sample controllers - genrateStatment()")
    // res.json({"Status": "OK"})
    installmentService.genrateInstallments(6).then(result => {
      res.json(result);
    })
    .catch(function(error) {
      console.dir(error);
      res.status(500).send('Internal Server Error');
    });
  },

  genrateStatment(req, res) {
    //activityService.getPatientActiveRecords(6).then(result => {
console.log("Sample controllers - genrateStatment()")
    // res.json({"Status": "OK"})
    monthlyStatmentService.genrateStatment(6).then(result => {
      res.json(result);
    })
    .catch(function(error) {
      console.dir(error);
      res.status(500).send('Internal Server Error');
    });
  },

  getEsearch(req, res) {
    // Simple One line search
    /*
    axios.get('http://ec2-18-219-59-158.us-east-2.compute.amazonaws.com:9200/twitter/_search?q=user:kimchy&pretty=true')
      .then(function (response) {
        // handle success
        res.json(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
    */

    // Complex queries
    /*
    var qs = {
        query : {
             match : { message: "indexed" }
        }
    };
    axios({
      method: 'get',
      url: 'http://ec2-18-219-59-158.us-east-2.compute.amazonaws.com:9200/twitter/_search?pretty=true',
      // headers: { 'Content-Type': 'application/json' },
      data: qs,
    })
      .then(function (response) {
        // console.dir(response.data)
        res.send(response.data);
      });
    */
    esearchService.searchPatient({name:"Some"})
    .then(response =>{
        res.json(response);
    });
  },

  setEsearch(req, res) {
    esearchService.setProvider({id:100000000001, PatientId:100000000001, name:"Some Provider", email:"provider@patient.com"})
    .then(response =>{
        res.json(response);
    });
    // axios({
    //   method: 'put',
    //   url: 'http://ec2-18-219-59-158.us-east-2.compute.amazonaws.com:9200/twitter/_doc/2',
    //   data: {
    //       user: "kimchy",
    //       post_date: "2009-11-15T14:12:12",
    //       message: "Another tweet, will it be indexed?"
    //   }
    // })
    // .then(function (response) {
    //   res.json(response.data);
    // });
  }
});
