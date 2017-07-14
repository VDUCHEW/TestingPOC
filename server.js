var express = require("express");
var request = require("request");
var path = require('path');
var multer = require('multer');
var upload = multer({ storage: multer.memoryStorage() });
var bodyParser = require("body-parser");

var app = express();

app.use(express.static(path.join(__dirname, 'view')));
app.use(express.static(path.join(__dirname, "script")));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + "/index.html"));
});
app.get('/scan', function (req, res) {
  res.sendFile(path.join(__dirname + "/view/scan.html"));
});
app.get('/form-complete', function (req, res) {
  res.sendFile(path.join(__dirname + "/view/form-complete.html"));
});

app.use(bodyParser.json({limit: '100mb'}));
app.use(bodyParser.urlencoded({limit: '100mb', extended: true, parameterLimit: 50000}));

// ================================================================> FASTFILL_BACK
app.post('/fastfill_back', upload.single('backsideImage'), function (req, res) {

  const form = {
    'metadata': req.body['metadata'],
    'backsideImage': {
      value: req.file.buffer,
      options: {
        filename: req.file.originalname,
        contentType: req.file.mimetype
      }
    }
  };

  const options = {
    method: 'POST',
    url: 'https://netverify.com/api/netverify/v2/fastfill',
    headers: {
      'postman-token': 'af169a84-4ad1-c528-b3ef-cd3b4e70bbec',
      'cache-control': 'no-cache',
      'authorization': 'Basic YWI4MjEyNjItOTc2NC00ZDk5LWJlZGQtZGRmYmM1MjdjZDY5Okp2NFBoU2N2aldEdnA5ZlBiTVJmRGhFc0pua3hTcTNt',
      'user-agent': 'JumioCorp WalmartTest/1.0'
    },
    formData: form
  };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    res.send(body);
  });
});

// ================================================================> CREATE MEMBERSHIP
app.post('/create-membership', function(req, res) {
  const data = JSON.parse(req.body.payload);

  const options = {
    method: 'POST',
    url: 'http://app.qa.membership.samsus.qa.walmart.com/membership-app/services/v1/membership/',
    headers:
      { 'postman-token': '0c29aee2-11ed-1548-7148-0ebc1e742eff',
        'cache-control': 'no-cache',
        'wm_consumer.tenant_id': '2',
        'wm_svc.name': 'membership',
        'wm_qos.correlation_id': '6d656d626572736869702d7365727669636573',
        accept: 'application/json',
        'wm_svc.env': 'stg',
        'wm_consumer.id': '1f4927f8-ca18-4860-9293-cab5a72b5bc0',
        'wm_svc.version': '2.0.0',
        'content-type': 'application/json'
      },
    body: data,
    json: true
  };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    res.send(body);
  });
});

app.listen(3000, function() {
  console.log("Started on PORT 3000");
});
