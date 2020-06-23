import React from 'react';
import './App.css';
import ReactEmoji from 'react-emoji';

class MessageList extends React.Component  {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    componentDidMount(){
        var box = document.getElementById('messageList');   // to position scroll down
    box.scrollTop = box.scrollHeight;
    }

    render() { 
    
        return ( <div  className="chatbox-messageList" id="messageList">
                <ul className="message-list">                 
            {this.props.messages.map( (message,item) => {  
              return (
              
               
                (this.props.sender === message.senderId)  ?
              //   (<li key={message.id} className="message ">
              //    <div >{message.senderId} </div>
              //    <div > {message.text} </div>
              //  </li>)  :
              //   (<li key={message.id} className="message ">
              //   <div >{message.senderId} </div>
              //   <div > {message.text} </div>
              // </li>) 
              (
                <div className="chat-sender" key={message.senderId.toString()+item} >
                <div className="messageContainer justifyEnd">             
                  <div className="messageBox backgroundBlue right-top">
                    <p className="messageText colorWhite ">{ReactEmoji.emojify(message.text)}</p>
                  </div>
                  </div>
                  <p className="sentText pr-10 text-right">{message.time}</p>
                  
                </div>
                )
                : (
                  <div className="chat-reciver" key={message.senderId.toString()+item} >
                  <div className="messageContainer justifyStart">
                    <div className="messageBox backgroundLight left-top">
                      <p className="messageText colorDark">{ReactEmoji.emojify(message.text)}</p>
                    </div>
                  </div>
                  <p className="sentText pl-10 text-left">{message.time}</p>
                  </div>
                )
             )
           })}
         </ul>
            
            </div> );
    }
}
 
export default MessageList;