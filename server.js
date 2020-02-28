var express = require('express');
var app = express();
var fileUpload = require('express-fileupload');
app.use(fileUpload());
var cors = require('cors');
app.use(cors());
var path = require('path');
var fs = require('fs');

var sql = require("mssql");


// config for your database
var config = {
  user: 'amaleshwar',
  password: '8977Amal868654',
  server: 'WKSBAN18ALF7042\\SQLEXPRESS',
  database: 'Login_Db'
};

var filePath = '';

app.post('/upload', function (req, res) {
  var dropoffLocation = '/public/images/';
  let fs = req.files.file2;
  let filename = fs.name;
  var dropoffpath = __dirname + dropoffLocation + filename;
  console.log(filename)
  fs.mv(dropoffpath, function (err) {
    if (err) {
      return res.status(500).send(err);
    }
  })
  res.send('File uploaded to ' + dropoffpath);
})

app.get('/getfiles', function (req, res) {


  //to get the names of all files in a folder.                          
  let filedir = path.join(__dirname, '/public/images/');
  var files = fs.readdirSync(filedir);
  //res.send(files);
  console.log(files.length);
  res.send(files);

});



app.get('/download', function (req, res) {

  res.download(filePath);
  console.log("File Successfully downloaded from ", filePath);
});

//------------------------------------------------------------------------------------


app.post('/downloadpost', function (req, res) {

  let filename = req.body.file_name.trim();
  //console.log(filename);

  var dropoffLocation = '/public/images/';

  filePath = __dirname + dropoffLocation + filename;
  // console.log(filePath);
  res.send(filePath);


});

//-------------------------------------------------------------------------------------


app.post('/user_validate', function (req, res) {

  let username = req.body.user_name.trim();

  let userpwd = req.body.user_pwd.trim();

  // const getUserDetails = 'select User_Name, Password from Login_Details where User_Name=@uname and Password=@pwd';
  const getUserDetails = 'select User_Name, Password from user_details where User_Name=@uname and Password=@pwd';


  // const getUserDetails = 'select *  from Login_Details';

  // connect to your database

  sql.connect(config).then(function () {


    var request = new sql.Request();
    request.input('uname', username);
    request.input('pwd', userpwd);
    // request.multiple =true;

    request.query(getUserDetails).then(function (recordSet) {
      console.log(recordSet);


      if (recordSet.rowsAffected == 1) {
        // console.log(recordSet.rowsAffected[0]); 
        console.log(recordSet.recordset[0].User_Name);  // to get username 
        var result = recordSet.rowsAffected[0].toLocaleString();
        res.send(result);
        sql.close();
      }
      else {
        res.send("Enter correct details");
        sql.close();
      }

    }).catch(function (err) {
      console.log(err);
      res.send("Error");
      sql.close();
    });
  }).catch(function (err) {
    console.log(err);
    res.send("Error");
  });
});

app.post('/user_register', function (req, res) {


  let username = req.body.user_name.trim();
  let userpwd = req.body.user_pwd.trim();
  let useremail = req.body.user_email_id.trim();
  let usercontact = req.body.user_cont_no.trim();

  const UpdateUserDetails = 'insert into user_details values (@uname, @pwd,@uemail,@ucontact)';

  // const getUserDetails = 'select *  from Login_Details';

  // connect to your database

  sql.connect(config).then(function () {


    var request = new sql.Request();
    request.input('uname', username);
    request.input('pwd', userpwd);
    request.input('uemail', useremail);
    request.input('ucontact', usercontact);
    // request.multiple =true;

    request.query(UpdateUserDetails).then(function (recordSet) {

      res.send("Registered Successfully ");
      sql.close();

    }).catch(function (err) {
      console.log(err);
      res.send("Error");
      sql.close();
    });
  }).catch(function (err) {
    console.log(err);
    res.send("Error");
  });
});


app.listen(8000, function () {
  console.log('App running on port 8000');
});


app.post('/readchatfile', function (req, res) {
  let filename = req.body.filename.trim();

  var dropoffLocation = '/public/ChatFiles/';

  filePath = __dirname + dropoffLocation + filename + '.txt';


  try {
    var chatdata = fs.readFileSync(filePath);

   // console.log("before chatdata", chatdata)
    chatdata = chatdata.toString().replace(/,\s*$/, "");

    // chatdata = JSON.stringify(chatdata).replace(/,\s*$/, "");
    // chatdata = JSON.stringify(chatdata)

  //  console.log("in chatdata", chatdata)
   // console.log(filePath)
    //console.log(chatdata);
    // res.send(chatdata );
    res.send('[' + chatdata + ']');
  }
  catch{
    console.log("empty")
   chatdata = [{
    senderId: " ",
    text: "Send message"
  }]
   res.send( chatdata );
  }

});

app.post('/writechatfile', function (req, res) {

  let chat_data = req.body.chatdata.trim();
  let filename = req.body.filename.trim();
  //console.log(filename);

  var dropoffLocation = '/public/ChatFiles/';

  filePath = __dirname + dropoffLocation + filename + '.txt';
  //console.log(filePath)
  fs.writeFileSync(filePath, chat_data, { flag: 'a+' });

  //console.log(chat_data)
  // console.log(filePath);
  res.send(filePath);


});


app.get('/getusers', function (req, res) {

  const getUserNames = 'select User_Name from user_details';


  sql.connect(config).then(function () {


    var request_getname = new sql.Request();

    request_getname.query(getUserNames).then(function (recordSet) {
     // console.log(recordSet.recordset);
      var userlist = Object.keys(recordSet.recordset).map((key) => recordSet.recordset[key].User_Name);
     // console.log(userlist);
      res.send(userlist);
      sql.close();
    }).catch(function (err) {
      console.log(err);
      res.send("Error");
      sql.close();
    });
  }).catch(function (err) {
    console.log(err);
    res.send("Error");
    
  });

});


////////////////////////////////////////////
//         socket
///////////////////////////////////////////////



var socket = require('socket.io');



server = app.listen(8001, function () {
  console.log('socket is listening on port 8001')
});

io = socket(server);

io.on('connection', (socket) => {
  console.log(socket.id);

  socket.on('SEND_MESSAGE', function (data) {
    io.emit('RECEIVE_MESSAGE', data);
  })
});






