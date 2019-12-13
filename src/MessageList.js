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
            {this.props.messages.map(message => {  
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
                <div className="messageContainer justifyEnd">
                  <p className="sentText pr-10">{message.senderId}</p>
                  <div className="messageBox backgroundBlue">
                    <p className="messageText colorWhite">{ReactEmoji.emojify(message.text)}</p>
                  </div>
                  <p> </p>
                </div>
                )
                : (
                  <div className="messageContainer justifyStart">
                    <div className="messageBox backgroundLight">
                      <p className="messageText colorDark">{ReactEmoji.emojify(message.text)}</p>
                    </div>
                    <p className="sentText pl-10 ">{message.senderId}</p>
                  </div>
                )
             )
           })}
         </ul>
            
            </div> );
    }
}
 
export default MessageList;