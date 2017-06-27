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

app.post('/fastfill_front', upload.single('frontsideImage'), function (req, res) {
  var form = {
    'metadata': req.body['metadata'],
    'frontsideImage': {
      value: req.file.buffer,
      options: {
        filename: req.file.originalname,
        contentType: req.file.mimetype
      }
    }
  };

  var options = {
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
    // console.log("RESPONSE ERROR======================>", error);
    if (error) throw new Error(error);
    // console.log("RESPONSE BODY=======================>", body);
    res.send(body);
  });
});

app.post('/fastfill_back', upload.single('backsideImage'), function (req, res) {
  var form = {
    'metadata': req.body['metadata'],
    'frontsideImage': {
      value: req.file.buffer,
      options: {
        filename: req.file.originalname,
        contentType: req.file.mimetype
      }
    }
  };

  var options = {
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
    // console.log("RESPONSE ERROR======================>", error);
    if (error) throw new Error(error);
    // console.log("RESPONSE BODY=======================>", body);
    res.send(body);
  });
});

// ================================================================> NETVERIFY
app.post('/netverify', function(req, res) {
  console.log("NETVERIFY REQUIRE BODY =====================>", req);
  console.log("NETVERIFY REQUIRE BODY =====================>", req.body['frontsideImage']);
  //UNDEFINED

  var options = {
    method: 'POST',
    url: 'https://netverify.com/api/netverify/v2/performNetverify',
    headers:
      { 'postman-token': 'a3964b79-9a29-9818-00a6-ef4e0d66394f',
        'cache-control': 'no-cache',
        authorization: 'Basic YWI4MjEyNjItOTc2NC00ZDk5LWJlZGQtZGRmYmM1MjdjZDY5Okp2NFBoU2N2aldEdnA5ZlBiTVJmRGhFc0pua3hTcTNt',
        'content-type': 'application/json',
        accept: 'application/json',
        'user-agent': 'walmart walmart/1.0.0' },
    body:
      { merchantIdScanReference: 'TestScanReference',
        frontsideImage: "Request IMG",
        successUrl: 'https://hookb.in/E7R0BeW8',
        errorUrl: 'https://hookb.in/E7R0BeW8',
        callbackUrl: 'https://requestb.in/1c0hrd11' },
    json: true
  };

  request(options, function (error, response, body) {
    console.log("RESPONSE ERROR=======================>", error);
    if (error) throw new Error(error);
    console.log("RESPONSE BODY=======================>", body);
  });
});

app.listen(3000, function() {
  console.log("Started on PORT 3000");
});
