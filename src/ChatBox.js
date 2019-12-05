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
const userList =['amal','subhaga','admin','admin2']
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
                        Reciver:'',
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
componentDidMount(){
    var box = document.getElementById('messageList');   // to position scroll down
    box.scrollTop = box.scrollHeight;

}



print(){
    console.log("printing........")
}


handleinput(e){
    if(e.key === 'Enter'){
        var temp = {"senderId":this.props.sendername,"text":e.target.value}

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
     // console.log("2",this.state.torender);
   //   if(this.state.torender){
      //    console.log("1");
          return <MessageList messages={this.state.messages}/>
      //       }
     }
     
}

handleuser(user){
    this.setState({Reciver:user})
    //Reciver=user;
    if(prevuserclick !=''){ 
        var prevuserlink = document.getElementById(prevuserclick);
        prevuserlink.classList.remove('userclicked')
    }
    else{
    var userlink= document.getElementById(user);
    userlink.classList.add("userclicked")
    }
    prevuserclick=user

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
        .then(res=>{    chatdata = "["+res.data+"]";
                       console.log("result",chatdata)
        }).then(()=>{ 
            this.setState({messages: JSON.parse(chatdata)})    
            console.log("in fun :",this.state.messages)     
        })      
}


    render() { 
        console.log("user name in chatbox :",this.props.sendername)
        return ( 
            <div className="chatbox-app ">
                <div  className="chatbox-header">
                    
                </div>
                <div  className="chatbox-body">
                    <div  className="chatbox-userList">
                            {/* Amal <br/>Subhaga  */}
                           { userList.map((user)=> <a id={user} key={user.toString()} className="user" onClick={()=>this.handleuser(user)}> {user} <br/> </a> )    }
                    </div>
                    <div  className="chatbox-message">
                        <MessageList messages={this.state.messages}/>
                       
                        <div  className="chatbox-messageForm" >
                            <input type="text" className="chatbox-msginput" placeholder="Type Here and Press Enter" onKeyPress={(e)=>this.handleinput(e)} onChange={ev => this.setState({message: ev.target.value})}/>
                        </div>
                    
                    </div>
                    
                </div> 
 
        </div> 
        );
    }
}
 
export default ChatBox;