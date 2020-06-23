import React, { Component } from 'react';
import './App.css';
import MessageList from './MessageList';
// import { get } from 'http';
import axios from 'axios';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

import io from "socket.io-client";

// var fs = require('fs') ;

import util,{ipadd} from './util.js';
const ipaddress= ipadd;
const path = require('path');
//const LOCALSTORAGE_KEY = 'chat';
var senderReciverKey=';'
//var Reciver="";
//const userList = ['amal','subhaga','admin','admin2']
var users=[];
var userslist=[];
var receiverList=[];
var prevuserclick='';
var chatdata='';
var listofnewmsg;

//var viewjson =[];

var tempdata =[
    {
            senderId: " ",
            text: "Send message",
            time:" "
          },
]
//var DUMMY_DATA = [
    // {
    //   senderId: "amaleshwar",
    //   text: "who'll win?"
    // },
    // {
    //   senderId: "subhaga",
    //   text: "who'll win?"
    // },
    // {
    //     senderId: "amaleshwar",
    //     text: "who'll win?"
    //   },
    //   {
    //     senderId: "subhaga",
    //     text: "who'll win?"
    //   },
      
  //]

class ChatBox extends Component {
    constructor(props) {
        super(props);
        this.state = {  messages:  tempdata,
                       // torender: false,
                        message: '',
                        author:'',
                        Reciver:'Select User',
                        errormessage:'',
                        userList:[],
                        inputtype:'text',
                        userdetails:[],
                        temp: true
         }
       //  console.log("socket ")
         this.print();
         this.socket = io(`${ipaddress}:8001`);
         this.print = this.print.bind(this);
         this.createNotification = this.createNotification.bind(this);
        this.socket.on('RECEIVE_MESSAGE', function(data){
            
            addMessage(data)
          //  console.log("messge recived is:",data)
        
           
        });

        const addMessage = data => {
         // console.log("data is: ",data)
          this.handleuser(this.state.Reciver,"from-addmessage")
          var reciverloginstatus = this.state.userdetails.filter((user)=>{ if(user.User_Name === data.msgreciver && user.Login_status===1 ){  return user.Login_status} })

         // console.log("reciverloginstatus",reciverloginstatus.length) 
          if(  this.props.sendername === data.msgreciver && prevuserclick !== data.senderId){
           //  console.log("call notification");
            // console.log("userclicked is ",prevuserclick);
             this.createNotification(data)
           //  console.log("called notification");  
          }
          else if( reciverloginstatus.length===0 && data.senderId===this.props.sendername ){

            let username = data.msgreciver; 
            let sendername = this.props.sendername
          //  console.log("sendername...............",sendername)
            var result;
            let formdata =new FormData();
            formdata.append('user_name',username);
            formdata.append('sender_name',sendername);
            axios.post(`http://${ipaddress}:8000/user_newmsg`,formdata)
            .then(res=>{   //console.log(res.statusText)
                       result =res.data;
           // console.log("logout result",result)
          })
           //  console.log("you are not correct Receiver");
            // console.log("userclicked is ",prevuserclick);
            
          }
            
        };
    }


//localStorage.getItem('chat') ? JSON.parse(window.localStorage.getItem(LOCALSTORAGE_KEY)) : DUMMY_DATA

//componentDidMount(){
    // var box = document.getElementById('messageList');   // to position scroll down
    // box.scrollTop = box.scrollHeight;
//}

componentDidUpdate(){
    var box = document.getElementById('messageList');   // to position scroll down
    box.scrollTop = box.scrollHeight;
    
}

componentDidMount(){
  
  this.getfilenames();
    try {
      setInterval(async () => {
        this.getfilenames();
      }, 3000);
      // setInterval(async () => {
      //   window.location.reload();
      // }, 1*60*1000);
    } catch(e) {
      console.log(e);
    }
  }
  getfilenames(){
    axios.get(`http://${ipaddress}:8000/getusers`)
    .then(res=>{    users = res.data;
    })
    .then(()=>{ 
        var toremove = this.props.sendername;
         userslist = users.map((key) => key.User_Name);
       // console.log(userslist)
        var tempunames = users;
        userslist = tempunames.filter(tempuname => tempuname.User_Name.toLowerCase() !== toremove.toLowerCase())  // (tempuname => tempuname.toLowerCase().indexOf(toremove.toLowerCase()) === -1)  
        //console.log("userslist",userslist);
        receiverList = userslist;
       // userslist= userslist.map( (user)=>   user.User_Name.replace(/^./, user.User_Name[0].toUpperCase()) )  // updated to get first character of each name to Capital
        this.setState({userList: userslist,userdetails:userslist})  
       // console.log("userslist",userslist);

      var  msgnotilist = tempunames.filter(tempuname => tempuname.User_Name.toLowerCase() === toremove.toLowerCase())
      listofnewmsg = msgnotilist[0].new_msgfrom
    //  console.log("userdetails",listofnewmsg)
      listofnewmsg = JSON.parse(listofnewmsg)

     if(listofnewmsg !== null){ listofnewmsg.map( (user)=> {     document.getElementById(user).classList.add("usernewmsg")     } ) }


       
    })      
  }



print(){
   // console.log("printing........")
}


handleinput(e){
    e.preventDefault();
  //  console.log("in handeinput",e.target.type)


    var filedata='';
       var date =new Date();
       var temp ;
       date =new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit'}).format(date);
       if(e.target.type==='file'){
        var file = e.target.files[0];
        var reader = new FileReader();
     
        reader.onloadend = function() {
         // console.log('RESULT', reader.result)
         filedata= reader.result;
        
        }
      //  console.log('RESULT', filedata)
        reader.readAsDataURL(file);
        this.setState({message:reader.result} ) 
       // console.log("setstate",filedata)
         temp = {"senderId":this.props.sendername,"text":filedata,"time":date}
    }
    else{
         temp = {"senderId":this.props.sendername,"text":this.state.message,"time":date}
    }
        if(this.state.message==="" ){   //this.state.message   //  e.target.value
                 //   console.log("empty message")
                    return;
        }  // console.log(2)
       // console.log("method", temp)

        var validJson = JSON.stringify(temp) 
        validJson =validJson+','
        let formdata =new FormData();
            formdata.append('chatdata',validJson);
            formdata.append('filename',senderReciverKey);
      axios.post(`http://${ipaddress}:8000/writechatfile/`,formdata)
        .then(res=>{      //console.log(res.data)
        } ).then(res=>         //console.log("should send msg"),
        this.socket.emit('SEND_MESSAGE', {
          senderId:  this.props.sendername,
          text: this.state.message, //e.target.value,
          msgreciver:this.state.Reciver
      }) 
      )
      .then(res=>{ this.handleuser(this.state.Reciver,"from-handleinput")})
      .then(res=>     //  console.log("---------------------------------------"),
     // console.log(document.getElementById("msginput").value),
    document.getElementById("msginput").value="",
  //  console.log('|'+document.getElementById("msginput").value+'|'),
   // console.log("---------------------------------------"),     
    )
    .then(res=>{   return <MessageList messages={this.state.messages} sender={this.props.sendername}/> })  
}

handleuser(user,ggg){
    this.setState({Reciver:user,errormessage:''})
  //  console.log("user: ",user," ggg: ",ggg)
   
    try{
      if(user !== 'Select User'){ document.getElementById(user).classList.remove('usernewmsg') }
    if(prevuserclick !==''){ 
        var prevuserlink = document.getElementById(prevuserclick);
        prevuserlink.classList.remove('userclicked')
        
    }
    var userlink= document.getElementById(user);
    userlink.classList.add("userclicked")
   
    prevuserclick=user;


     if(listofnewmsg !== null)
     {

      var notifi_fromuser =  listofnewmsg.indexOf(user)  
    //  console.log("after filter:",notifi_fromuser)
  
      if(notifi_fromuser !== -1){

      //  console.log("fgggggggggggggggggggggggggggggggggggggggggggghjfkgjjkdnfjdnfksdnfkajdfn",listofnewmsg)

        listofnewmsg = listofnewmsg.filter((useritem)=> useritem !== user);
       // console.log("fgggggggggggggggggggggggggggggggggggggggggggghjfkgjjkdnfjdnfksdnfkajdfn",listofnewmsg)
 
        listofnewmsg =JSON.stringify(listofnewmsg)
     //   console.log("after stringyfy",listofnewmsg)
 
       let username =this.props.sendername; 
       let msgfromlist = listofnewmsg;
       var result;
       let formdata =new FormData();
       formdata.append('user_name',username);
       formdata.append('listofnewmsg',msgfromlist);
       axios.post(`http://${ipaddress}:8000/removeuser_newmsg`,formdata)
       .then(res=>{       //console.log(res.statusText)
       result =res.data;
      // console.log("removed msg from user list",result)
 
     })
       
      }
  }

    }
    catch(error)
          
    {
            this.setState({errormessage:"Please Select a User from list"})
            return;
    }

     var  senderReciver = [this.props.sendername.toLowerCase(),user.toLowerCase()];
     senderReciver.sort();
      senderReciverKey=senderReciver[0]+senderReciver[1]; 
     var pairfilename= senderReciverKey+".txt" // this pair key of sender and user.
   // console.log(senderReciverKey,pairfilename)    

    pairfilename = path.join(__dirname, '/ChatFiles/',pairfilename);
  
    let formdata =new FormData();
            formdata.append('filename',senderReciverKey);
            
    axios.post(`http://${ipaddress}:8000/readchatfile`,formdata)
        .then(res=>{  
           
                        //      chatdata = '['+ res.data + ']';
                        chatdata =  res.data;
                               
                     //  console.log("result",chatdata)
        }).then(()=>{ 
            // this.setState({messages: JSON.parse(chatdata)}) 
            this.setState({messages: chatdata})       
           // console.log("in fun ",ggg, " :" ,this.state.messages)    
         }) //.then(()=>{  
        //     if(ggg==='from-addmessage'){
        //     console.log("call notification");
        //    this.createNotification('success')
        //    console.log("called notification");  
        //     }
        //     else{
        //         console.log("no notification");  
        //     }
        // })      
}
searchusers(e){
   // console.log(e.target.value)
    var tosearch = e.target.value;
    var tempfnames = receiverList ;
    var res = tempfnames.filter(tempfname => tempfname.User_Name.toLowerCase().indexOf(tosearch.toLowerCase()) !== -1)
  
    this.setState({userdetails:res,Reciver:'Select User',messages:  tempdata}) //to view only searched files

    
   }
   addattachment(e){
    //    alert("hi",e.target.files[0].name)
     //  console.log(e.target.files[0])
    //   var fileis = e.target.files[0]
    //     this.setState({inputtype:'file'},
    //    document.getElementById('msginput').value= e.target.files[0] )
      // this.setState({inputtype:'file'}
    //    , () => {document.getElementById('msginput').value= fileis}
   // );
   // document.getElementById('msginput').value= e.target.files[0]
       
   }
   createNotification(msg) {

  //  console.log("------before return----   inside notification");
    NotificationManager.success(msg.text, `New Message From ${msg.senderId} `,10000, ()=> {this.handleuser(msg.senderId,"from-notification")} );
  //  console.log("----------   inside notification");
    
    try{
    var usernewmsg= document.getElementById(msg.senderId);
    usernewmsg.classList.add("usernewmsg");
    }
    catch(error)
          
    {
            
            return;
    }
    return ;
  };


    render() { 
       // console.log("user name in chatbox :",this.props.sendername)
        return ( 
            <div className="chatbox-app ">

                <div  className="chatbox-header">
                    
                </div>
                <div  className="chatbox-body">
                    <div  className="chatbox-userList" cellPadding="1" cellSpacing="1">
                      <div className="div-searchuserlist">
                        <input type="search" className="chatbox-searchinput searchinput" id="searchinput" placeholder="Search"  onChange={(e)=>this.searchusers(e)}/>
                          </div>
                          <div className="userlist" id="userlist-scrollstyle">   
                            {/* Amal <br/>Subhaga  */}
                            {/* { userList.map((user)=> <a id={user} key={user.toString()} className="user" onClick={()=>this.handleuser(user)}> {user} <br/> </a> )    } */}
                           { this.state.userdetails.map((user)=> <div className="div-userlist" key={user.User_Name.toString()} ><button id={user.User_Name}  className="user" onClick={()=>this.handleuser(user.User_Name,"from-userclick")}>
                               {  user.Login_status ===1 ?   
                               <span className="btn-username-span"><i className="fa fa-globe" aria-hidden="true"></i> {user.User_Name.replace(/^./, user.User_Name[0].toUpperCase())}  </span> :
                              <span className="btn-username-span"><i className="fa fa-circle"  ></i> {user.User_Name.replace(/^./, user.User_Name[0].toUpperCase())} </span>
                                }
                               <br/> </button></div> )    }
                        </div>
                    </div>
                    <div  className="chatbox-message">
                        <div  className="chat-header " > <div className="username-display" >{this.state.Reciver}</div> <div className="attachbutton" >
                            <label htmlFor="inputFileToLoad">
         <i className="fa fa-paperclip" style={{cursor: 'pointer'}} ></i>
    </label>
    <input id="inputFileToLoad"   type="file" className="fa fa-paperclip" name="" style={{display: 'none',cursor: 'pointer'}}
    onClick={(e)=>this.addattachment(e)} onChange={(e)=>this.handleinput(e)} /></div> </div>
                        <MessageList messages={this.state.messages} sender={this.props.sendername}/>
                    <div  className="chatbox-messageForm input-group" >
                            <textarea type={`${this.state.inputtype}`} className="chatbox-msginput input " id="msginput" placeholder="Type Here and Press Enter" onKeyPress={event => (event.key === 'Enter') ? this.handleinput(event) : null } onChange={ev => this.setState({message: ev.target.value})}   /> 
                            <div className="input-group-append">
									      <span className="input-group-text-override sendButton"  onClick={e => this.handleinput(e)}><i className="fa fa-location-arrow"></i></span>
								            </div>
                     </div>
                    
                    </div>
                    
                </div> 
                {/* {this.state.errormessage}  */}
                <span style={{color:"red"}}> {this.state.errormessage}</span>
              
                <NotificationContainer/>

 
        </div> 
        );
    }
}
 
export default ChatBox;