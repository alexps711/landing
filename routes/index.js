const express = require('express');
const router = express.Router();

//mailgun constants
const API_KEY = '****';
const DOMAIN = 'mg.wellyou.io';
const HOST = 'api.eu.mailgun.net';
const mailgun = require('mailgun-js')({apiKey: API_KEY, domain: DOMAIN, host: HOST});
const list = mailgun.lists('list@mg.wellyou.io');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(__dirname + '/index.html');
});

/* Handle form submission */
router.post('/mailgun', (req, res, next) => {

  //Create new mailing list member 
  var newUser = {
    suscribed: true,
    address: req.body.email,
  };

  //Add member to mailing list 
  list.members().create(newUser, function(err, data) {
    console.log(data);
  });
  
  //Go back to home page
  res.sendFile(__dirname + '/index.html')
})

module.exports = router;
