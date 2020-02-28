var express = require('express');
var app = express();
var fileUpload = require('express-fileupload');
app.use(fileUpload());
var cors = require('cors');
app.use(cors());

app.post('/click', function (req, res) {
  let message1 = req.body.message1.trim();
  let message2 = req.body.message2.trim();
  var totalmsg = message1 +' ' +message2 ;
  res.send(totalmsg);
});

app.post('/click2', function (req, res) {
    let message = req.body.message.trim();

    res.send(message);
  });

app.listen(8000, function () {
  console.log('App running on port 8000');
});















