import React, { Component } from 'react';
import './App.css';
import MessageList from './MessageList';
import { get } from 'http';
import axios from 'axios';

import io from "socket.io-client";

var fs = require('fs') ;
const path = require('path');

const LOCALSTORAGE_KEY = 'chat';
var senderReciverKey=';'
//var Reciver="";
//const userList = ['amal','subhaga','admin','admin2']
var users=[];
var prevuserclick='';
var chatdata=''

var tempdata =[
    {
            senderId: " ",
            text: "Send message"
          },
]
var DUMMY_DATA = [
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
      
  ]

class ChatBox extends Component {
    constructor(props) {
        super(props);
        this.state = {  messages:  tempdata,
                       // torender: false,
                        message: '',
                        author:'',
                        Reciver:'Select User',
                        errormessage:'',
                        userList:[]
         }
         console.log("socket ")
         this.print();
         this.socket = io('localhost:8001');
         this.print = this.print.bind(this);
        this.socket.on('RECEIVE_MESSAGE', function(data){
            addMessage(data);
            console.log("messge recived is:",data)
        });

        const addMessage = data => {
           // console.log("data in data :",data);


          this.handleuser(this.state.Reciver);

           // console.log("data in state before : ",this.state.messages);

            //this.setState({messages: [...this.state.messages]})
     
     
           // this.setState({messages: [...this.state.messages, data]});

         //   console.log("data in state after :",this.state.messages);

         //  this.handleuser(this.state.Reciver);
         //  console.log("data in state after :",this.state.messages);
     
            
            
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
  }
  getfilenames(){
    axios.get("http://localhost:8000/getusers")
    .then(res=>{    users = res.data;
                  // console.log(users)
    })
    .then(()=>{ 

        var toremove = this.props.sendername;
        var tempunames = users;
        users = tempunames.filter(tempuname => tempuname.toLowerCase().indexOf(toremove.toLowerCase()) === -1)
      //  console.log(users)
        this.setState({userList: users})
       // console.log(this.state.userList)
        // console.log(this.state.filenames[0]) 
        // console.log(this.state.filenames.length) 
        
    })      
  }



print(){
    console.log("printing........")
}


handleinput(e){
   // if(e.key === 'Enter'){
        var temp = {"senderId":this.props.sendername,"text":this.state.message}
        console.log(1)
        if(this.state.message===""){
                    console.log("empty message")
                    return;
        } console.log(2)
       // DUMMY_DATA=[...DUMMY_DATA,temp]

        //this.setState({messages:DUMMY_DATA})

        console.log("method", temp)

        var validJson = JSON.stringify(temp) //to save in local storage
        validJson =validJson+','
      // this.onUnload();
      //  window.localStorage.setItem(LOCALSTORAGE_KEY,validJson)

        // to write to file 
        let formdata =new FormData();
            formdata.append('chatdata',validJson);
            formdata.append('filename',senderReciverKey);

      var promise = new Promise(function(resolve, reject) {
        // call resolve if the method succeeds
        axios.post("http://localhost:8000/writechatfile/",formdata)
        .then(res=>{console.log(res.data)})
         resolve(true);
      })
      promise.then(bool => 
        console.log(""),
       
      )
        

    this.socket.emit('SEND_MESSAGE', {
        senderId:  this.props.sendername,
        text: e.target.value,
      
    })

    
    this.handleuser(this.state.Reciver);
      // props.dispatch(e.target.value,'Me')
      e.target.value  =''
    document.getElementById("msginput").value='';
      
      this.setState({message: ''})
     // console.log("2",this.state.torender);
   //   if(this.state.torender){
      //    console.log("1");
          return <MessageList messages={this.state.messages} sender={this.props.sendername}/>
      //       }

    // }
     
}

handleuser(user){
    this.setState({Reciver:user,errormessage:''})
    //Reciver=user;
    console.log(user,this.state.Reciver)
    try{
    if(prevuserclick !=''){ 
        var prevuserlink = document.getElementById(prevuserclick);
        prevuserlink.classList.remove('userclicked')
    }

    var userlink= document.getElementById(user);
    userlink.classList.add("userclicked")
   
    prevuserclick=user;

    }
    catch(error)
          
    {
            this.setState({errormessage:"Please Select a User from list"})
            return;
    }

    //generate Sender_Reciver Key:
     var  senderReciver = [this.props.sendername,user];
     senderReciver.sort();
      senderReciverKey=senderReciver[0]+senderReciver[1]; 
     var pairfilename= senderReciverKey+".txt" // this pair key of sender and user.
    console.log(senderReciverKey,pairfilename)    

    pairfilename = path.join(__dirname, '/ChatFiles/',pairfilename);
  
    let formdata =new FormData();
            formdata.append('filename',senderReciverKey);
            
    axios.post("http://localhost:8000/readchatfile",formdata)
        .then(res=>{  
           
                        //      chatdata = '['+ res.data + ']';
                        chatdata =  res.data;
                               
                       console.log("result",chatdata)
        }).then(()=>{ 
            // this.setState({messages: JSON.parse(chatdata)}) 
            this.setState({messages: chatdata})       
            console.log("in fun :",this.state.messages)     
        })      
}
searchusers(e){
    console.log(e.target.value)
    var tosearch = e.target.value;
    var tempfnames = users ;
    var res = tempfnames.filter(tempfname => tempfname.toLowerCase().indexOf(tosearch.toLowerCase()) !== -1)
  
    this.setState({userList:res,Reciver:'Select User',messages:  tempdata}) //to view only searched files

    
   }


    render() { 
        console.log("user name in chatbox :",this.props.sendername)
        return ( 
            <div className="chatbox-app ">
                <div  className="chatbox-header">
                    
                </div>
                <div  className="chatbox-body">
                    <div  className="chatbox-userList">
                    <input type="search" className="chatbox-searchinput searchinput" id="searchinput" placeholder="Search"  onChange={(e)=>this.searchusers(e)}/>
                            {/* Amal <br/>Subhaga  */}
                            {/* { userList.map((user)=> <a id={user} key={user.toString()} className="user" onClick={()=>this.handleuser(user)}> {user} <br/> </a> )    } */}
                           { this.state.userList.map((user)=> <a id={user} key={user.toString()} className="user" onClick={()=>this.handleuser(user)}> {user} <br/> </a> )    }
                    </div>
                    <div  className="chatbox-message">
                        <div  className="chat-header " > {this.state.Reciver} </div>
                        <MessageList messages={this.state.messages} sender={this.props.sendername}/>
                       
                        <div  className="chatbox-messageForm" >
                            <input type="text" className="chatbox-msginput input" id="msginput" placeholder="Type Here and Press Enter" onKeyPress={event => event.key === 'Enter' ? this.handleinput(event) : null } onChange={ev => this.setState({message: ev.target.value})}/>
                            <button className="sendButton" onClick={e => this.handleinput(e)}>Send</button>
                        </div>
                    
                    </div>
                    
                </div> {this.state.errormessage}
 
        </div> 
        );
    }
}
 
export default ChatBox;