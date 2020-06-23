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
// var config = {
//   user: 'amaleshwar',
//   password: '8977Amal868654',
//   server: 'WKSBAN18ALF7042\\SQLEXPRESS',
//   database: 'Login_Db'
// };
var config = {
  user: 'amaleshwar',
  password: '8977Amal868654',
  server: 'DESKTOP-QSRUPK8',
  database: 'Login_Db' 
};                                      //   ALTER TABLE [Login_Db].[dbo].[user_details] ADD Login_status int ;
//   update user_details set Login_status=0  where ID=1001

// var config = {
//   user: 'amaleshwar',
//   password: '8977Amal868654',
//   server:   'LAPTOP-AQ89KHUR\\SQLEXPRESS',         
//   database: 'Login_Db'
// };

var filePath = '';
var browsercloselogoutlist=[];

app.post('/cancel_browserclose_logout', function (req, res) {
  let username = req.body.user_name.trim();
  //   console.log("---before--cancel-----------",browsercloselogoutlist)
  browsercloselogoutlist = browsercloselogoutlist.filter(tempuname => tempuname.toLowerCase() !== username.toLowerCase()) 
  //   console.log("---after--cancel------------",browsercloselogoutlist)
});
app.post('/browserclose_logout', function (req, res) {

  let username = req.body.user_name.trim();
  var result = '';
  const setUserloggedin = 'update user_details set Login_status=0  where User_Name=@uname';
  browsercloselogoutlist.push(username);
  //   console.log("---------------after pushed-----------------",browsercloselogoutlist)

  setTimeout( async () => {

      var userlogoutconfirm =  browsercloselogoutlist.indexOf(username) 
      //   console.log("--------------before logout-----------------------",userlogoutconfirm,browsercloselogoutlist)

      if(userlogoutconfirm!== -1){
       
  sql.connect(config).then(function () {

    var request = new sql.Request();
    request.input('uname', username);
    request.query(setUserloggedin).then(function (recordSet) {

         result = recordSet.rowsAffected[0].toLocaleString();
          //   console.log("logout",result)
        res.send(result);
        sql.close();
    }).catch(function (err) {
      //   console.log(err);
      res.send("Error");
      sql.close();
    });
  }).catch(function (err) {
    //   console.log(err);
    res.send("Error");
  });
}
  browsercloselogoutlist = browsercloselogoutlist.filter(tempuname => tempuname.toLowerCase() !== username.toLowerCase()) 
  //   console.log("---------------after logout-----------------",browsercloselogoutlist)
}, 11*1000);


});

app.post('/upload', function (req, res) {
  var dropoffLocation = '/public/images/';
  let fs = req.files.file2;
  let filename = fs.name;
  var dropoffpath = __dirname + dropoffLocation + filename;
  //   console.log(filename)
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
 // //   console.log(files.length);
  res.send(files);

});



app.get('/download', function (req, res) {

  res.download(filePath);
  //   console.log("File Successfully downloaded from ", filePath);
});

//------------------------------------------------------------------------------------


app.post('/downloadpost', function (req, res) {

  let filename = req.body.file_name.trim();
  ////   console.log(filename);

  var dropoffLocation = '/public/images/';

  filePath = __dirname + dropoffLocation + filename;
  // //   console.log(filePath);
  res.send(filePath);


});

//-------------------------------------------------------------------------------------


app.post('/user_validate', function (req, res) {

  let username = req.body.user_name.trim();

  let userpwd = req.body.user_pwd.trim();
  var result = '';
  // const getUserDetails = 'select User_Name, Password from Login_Details where User_Name=@uname and Password=@pwd';
  const getUserDetails = 'select User_Name, Password from user_details where User_Name=@uname and Password=@pwd';
  const setUserloggedin = 'update user_details set Login_status=1  where User_Name=@uname';

  // const getUserDetails = 'select *  from Login_Details';

  // connect to your database

  sql.connect(config).then(function () {


    var request = new sql.Request();
    request.input('uname', username);
    request.input('pwd', userpwd);
    // request.multiple =true;

    request.query(getUserDetails).then(function (recordSet) {
    //  //   console.log(recordSet);


      if (recordSet.rowsAffected == 1) {
        // //   console.log(recordSet.rowsAffected[0]); 
       // //   console.log(recordSet.recordset[0].User_Name);  // to get username 
         result = recordSet.rowsAffected[0].toLocaleString();

      }
      else {
        res.send("Enter correct details");
        sql.close();
      }

    }).then( function (err) {
       if(result==="1"){
      //  //   console.log("result",result)
        request.query(setUserloggedin).then(function (recordSet) {
         // //   console.log("inside 2nd sql",result)
        //  //   console.log("before sql close ",result)
          sql.close();
          res.send(result);
          
        })
      }
    }).catch(function (err) {
      //   console.log(err);
      res.send("Error");
      sql.close();
    });
  }).catch(function (err) {
    //   console.log(err);
    res.send("Error");
  });
});

app.post('/user_logout', function (req, res) {

  let username = req.body.user_name.trim();
  var result = '';
  const setUserloggedin = 'update user_details set Login_status=0  where User_Name=@uname';
  sql.close();
  sql.connect(config).then(function () {

    var request = new sql.Request();
    request.input('uname', username);
    request.query(setUserloggedin).then(function (recordSet) {

         result = recordSet.rowsAffected[0].toLocaleString();
          //   console.log("logout",result)
        res.send(result);
        sql.close();
    }).catch(function (err) {
      //   console.log(err);
      res.send("Error");
      sql.close();
    });
  }).catch(function (err) {
    //   console.log(err);
    res.send("Error");
  });
});

app.post('/user_newmsg', function (req, res) {

  let username = req.body.user_name.trim();
  let sendername = req.body.sender_name.trim();
  //   console.log("sendername is, username: ",sendername,username);

  var newmsglist = '';

  const getmsgfrom = 'select new_msgfrom from user_details where User_Name=@uname';
  const setmsgfrom = 'update user_details set new_msgfrom=@msgfromlist  where User_Name=@uname';
  sql.close();
  sql.connect(config).then(function () {

    var request = new sql.Request();
    request.input('uname', username);
    
    request.query(getmsgfrom).then(function (recordSet) {
        //   console.log("records of: ",recordSet.recordset[0].new_msgfrom);
  
  
        if (recordSet.recordset[0].new_msgfrom === null) {
           //   console.log(recordSet.recordset[0]); 
         // //   console.log(recordSet.recordset[0].User_Name);  // to get username 
         //   console.log("sendername is: ",sendername);
         newmsglist = '["'+sendername+'"]' ;
         //   console.log("newmsglist is:",newmsglist)
        }
        else {
          newmsglist = recordSet.recordset[0].new_msgfrom;
          //   console.log("list is:",JSON.parse(newmsglist))
          newmsglist =JSON.parse(newmsglist)
         
          
          var notifi_fromuser =  newmsglist.indexOf(sendername)  //filter(tempuname => tempuname.toLowerCase() !== sendername.toLowerCase())
          //   console.log("after filter:",notifi_fromuser)

          if(notifi_fromuser=== -1){
            newmsglist.push(sendername)
          }
          

          //   console.log("before stringfy:",newmsglist)
          newmsglist =JSON.stringify(newmsglist)
          //   console.log("fter stringyfy:",newmsglist)
          
          
        }
  
      }).then( function (err) {
        request.input('msgfromlist', newmsglist);
        // if(result==="1"){
         // //   console.log("result",result)
          request.query(setmsgfrom).then(function (recordSet) {
          //  //   console.log("inside 2nd sql",result)
         //   //   console.log("before sql close ",result)
            sql.close();
            res.send("Done");
            
        })
       // }
      }).catch(function (err) {
      //   console.log(err);
      res.send("Error");
      sql.close();
    });
  }).catch(function (err) {
    //   console.log(err);
    res.send("Error");
  });
});

app.post('/removeuser_newmsg', function (req, res) {

  let username = req.body.user_name.trim();
  let msgfromlist = req.body.listofnewmsg.trim();

  //   console.log("msgfromlist: ",msgfromlist,username);
  //msgfromlist =JSON.stringify(msgfromlist)
  //   console.log("msgfromlist: ",msgfromlist,);

  const setmsgfrom = 'update user_details set new_msgfrom=@msgfromlist  where User_Name=@uname';
  sql.close();
  sql.connect(config).then(function () {

    var request = new sql.Request();
    request.input('uname', username);
    request.input('msgfromlist', msgfromlist);
    request.query(setmsgfrom).then(function (recordSet) {

      //   console.log("rows effected :",recordSet.rowsAffected);
       
  
      sql.close();
      res.send("Done");

    }).catch(function (err) {
      //   console.log(err);
      res.send("Error");
      sql.close();
    });
  }).catch(function (err) {
    //   console.log(err);
    res.send("Error");
  });
});


app.post('/user_register', function (req, res) {


  let username = req.body.user_name.trim();
  let userpwd = req.body.user_pwd.trim();
  let useremail = req.body.user_email_id.trim();
  let usercontact = req.body.user_cont_no.trim();

  const UpdateUserDetails = 'insert into user_details values (@uname, @pwd,@uemail,@ucontact,Null,Null)';

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
      //   console.log(err);
      res.send("Error");
      sql.close();
    });
  }).catch(function (err) {
    //   console.log(err);
    res.send("Error");
  });
});


app.listen(8000, function () {
     console.log('App running on port 8000');
});


app.post('/readchatfile', function (req, res) {
  let filename = req.body.filename.trim().toLowerCase();
  //   console.log("filename ", filename)
  var dropoffLocation = '/public/ChatFiles/';

  filePath = __dirname + dropoffLocation + filename + '.txt';


  try {
    var chatdata = fs.readFileSync(filePath);

   // //   console.log("before chatdata", chatdata)
    chatdata = chatdata.toString().replace(/,\s*$/, "");

    // chatdata = JSON.stringify(chatdata).replace(/,\s*$/, "");
    // chatdata = JSON.stringify(chatdata)

  //  //   console.log("in chatdata", chatdata)
   // //   console.log(filePath)
    ////   console.log(chatdata);
    // res.send(chatdata );
    res.send('[' + chatdata + ']');
  }
  catch{
    //   console.log("empty")
   chatdata = [{
    senderId: " ",
    text: "Send message"
  }]
   res.send( chatdata );
  }

});

app.post('/writechatfile', function (req, res) {

  let chat_data = req.body.chatdata.trim();
  let filename = req.body.filename.trim().toLowerCase();
  //   console.log("write file to: "+filename);
  //   console.log("write file to: "+chat_data);
  var dropoffLocation = '/public/ChatFiles/';

  filePath = __dirname + dropoffLocation + filename + '.txt';
  ////   console.log(filePath)
  fs.writeFileSync(filePath, chat_data, { flag: 'a+' });

  ////   console.log(chat_data)
  // //   console.log(filePath);
  res.send(filePath);


});


app.get('/getusers', function (req, res) {

  const getUserNames = 'select User_Name,Login_status,new_msgfrom from user_details';

  sql.close();
  sql.connect(config).then(function () {


    var request_getname = new sql.Request();

    request_getname.query(getUserNames).then(function (recordSet) {
    //  //   console.log(recordSet.recordset);
     // var userlist = Object.keys(recordSet.recordset).map((key) => recordSet.recordset[key].User_Name);
       ////   console.log(recordSet.recordset.map((key) => key));
      res.send(recordSet.recordset);
      sql.close();
    }).catch(function (err) {
      //   console.log(err);
      res.send("Error");
      sql.close();
    });
  }).catch(function (err) {
    //   console.log(err);
    res.send("Error");
    sql.close();
    
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






// app.post('/viewjson', function (req, res) {
//   let filename = 'chatnotifcations'  //req.body.filename.trim().toLowerCase();
//  // //   console.log("filename ", filename)
//   var dropoffLocation = '/public/ChatFiles/';

//   filePath = __dirname + dropoffLocation + filename + '.txt';


//   try {

//     var chatdata = fs.readFileSync(filePath);
   
//      chatdata = chatdata.toString().replace(/,\s*$/, "");
//     // //   console.log("filename ", chatdata)
//      res.send( chatdata );
//   }
//   catch{
//     //   console.log("empty")
//    chatdata = [{
//     senderId: " ",
//     text: "Send message"
//   }]
//    res.send( chatdata );
//   }

// });

// app.post('/updatejson', function (req, res) {

//   let chat_data = req.body.statusvalue.trim();
//   let filename = 'chatnotifcations'  //req.body.filename.trim().toLowerCase();
//   ////   console.log("write file to: "+filename);
//  // //   console.log("write file to: "+chat_data);
//   var dropoffLocation = '/public/ChatFiles/';

//   filePath = __dirname + dropoffLocation + filename + '.txt';
//   ////   console.log(filePath)
//   var file_content = fs.readFileSync(filePath);
// var content = JSON.parse(file_content);

// content.Employee.map( (user)  => { if(user.id === '4'){  user.Status= '0' }} );
// //   console.log(content)

// fs.writeFileSync(filePath, JSON.stringify(content) );

// var file_content2 = fs.readFileSync(filePath);
// var content2 = JSON.parse(file_content2);
// //   console.log(content2)
//   res.send(filePath);


// });

// app.post('/addjson', function (req, res) {

//   let chat_data = req.body.addvalue.trim();
//   let filename = 'chatnotifcations'  

//   var dropoffLocation = '/public/ChatFiles/';

//   filePath = __dirname + dropoffLocation + filename + '.txt';
//   //   console.log(JSON.parse(chat_data))
  
//   var file_content = fs.readFileSync(filePath);
// //var content = JSON.parse(file_content);

// var parseJson = JSON.parse(file_content);
// parseJson.Employee.push(JSON.parse(chat_data))

// //   console.log("-----------------",parseJson)

// fs.writeFileSync(filePath, JSON.stringify(parseJson) );

// var file_content2 = fs.readFileSync(filePath);
// var content2 = JSON.parse(file_content2);
// //   console.log(content2)
//   res.send(filePath);


// });

// app.post('/deletejson', function (req, res) {

//   let chat_data = req.body.addvalue.trim();
//   let filename = 'chatnotifcations'  

//   var dropoffLocation = '/public/ChatFiles/';

//   filePath = __dirname + dropoffLocation + filename + '.txt';
 
  
//   var file_content = fs.readFileSync(filePath);
//   var content = JSON.parse(file_content);
  
//   // var key = content.Employee.filter( (user,i)  => { if(user.Status === '1'){ return i}  });
//    content.Employee.sort(function(a, b) {
//     return b.Status.localeCompare(a.Status);
// });
//   //   console.log(content.Employee)  
//   var results = content.Employee.reduce((results, item,i) => {
//     if(item.Status === '0') results.push(i) // modify is a fictitious function that would apply some change to the items in the array
//     return results
// }, [])
// //   console.log(results) 
//   results.map((item) => {    content.Employee.splice(item) 
//   } )
// //   content.Employee.splice(2, 1) 
// //   content.Employee.splice(2, 1) 
//   //   console.log(content)

// ////   console.log("-----------------",parseJson)

// fs.writeFileSync(filePath, JSON.stringify(content) );

//  var file_content2 = fs.readFileSync(filePath);
//  var content2 = JSON.parse(file_content2);
//  //   console.log(content2)
//   res.send(filePath);


// });