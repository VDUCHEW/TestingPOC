var express = require("express");
var request = require("request");
var path = require('path');
var multer = require('multer');
var upload = multer();
var bodyParser = require("body-parser");

var app = express();
app.get('/',function(req,res) {
  res.sendFile(path.join(__dirname + "/index.html"));
});
app.use(bodyParser.json({limit: '100mb'}));
app.use(bodyParser.urlencoded({limit: '100mb', extended: true, parameterLimit:50000}));

// ===============================================================> FASTFILL
app.post('/fastfill', function(req, res) {
  //GETING {"httpStatus":"400","message":"Bad Request: Missing start boundary","requestURI":"https://netverify.com/api/netverify/v2/fastfill"}

  var formData = upload.fields([{ name: 'fileUpdater'}]);
  console.log('form data =======================>', formData);
  // console.log('form data', res);

  var options = { method: 'POST',
    url: 'https://netverify.com/api/netverify/v2/fastfill',
    headers:
      { 'postman-token': 'af169a84-4ad1-c528-b3ef-cd3b4e70bbec',
        'cache-control': 'no-cache',
        authorization: 'Basic YWI4MjEyNjItOTc2NC00ZDk5LWJlZGQtZGRmYmM1MjdjZDY5Okp2NFBoU2N2aldEdnA5ZlBiTVJmRGhFc0pua3hTcTNt',
        accept: 'application/json',
        'user-agent': 'JumioCorp WalmartTest/1.0',
        'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'
      },
    formData: formData
  };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    console.log(body);
  });
});

// ================================================================> NETVERIFY
app.post('/netverify', function(req, res) {
  //GETTING { httpStatus: '400', message: 'Bad Request: Error creating JSON-based XMLStreamReader', requestURI: 'https://netverify.com/api/netverify/v2/performNetverify' }
  console.log("NETVERIFY =====================>", req);
  console.log("NETVERIFY =====================>", req.body);

  var options = { method: 'POST',
    url: 'https://netverify.com/api/netverify/v2/performNetverify',
    headers:
      { 'postman-token': '26018063-eee8-5631-83ac-66ad8ff36650',
        'cache-control': 'no-cache',
        authorization: 'Basic YWI4MjEyNjItOTc2NC00ZDk5LWJlZGQtZGRmYmM1MjdjZDY5Okp2NFBoU2N2aldEdnA5ZlBiTVJmRGhFc0pua3hTcTNt',
        'content-type': 'application/json',
        accept: 'application/json',
        'user-agent': 'walmart walmart/1.0.0'
      },
    json: true };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    console.log(body);
  });
});

app.listen(3000,function() {
  console.log("Started on PORT 3000");
});
