import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './Login';
import Axios from 'axios';

import ChatBox from "./ChatBox";


var button ='';


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
                    Loggedin: sessionStorage.getItem('state') ? JSON.parse(sessionStorage.getItem('state')).Loggedin : false,
                    temp:null,
                    user_name: sessionStorage.getItem('state') ? JSON.parse(sessionStorage.getItem('state')).user_name : false,
                    
                  }
    // this.state = { Loggedin: true,
    // temp:null,
    //}
  }


onUnload = (e) => {
  sessionStorage.setItem("state", JSON.stringify(this.state));

    if (window.localStorage) {
                            // flag the page as being unloading
   window.localStorage['myUnloadEventFlag']=new Date().getTime();
   window.localStorage['logoutcancel']="false";
  

  
  let username = JSON.parse(sessionStorage.getItem('state')).user_name;
    var result;
    let formdata =new FormData();
    formdata.append('user_name',username);
    Axios.post("http://192.168.0.5:8000/browserclose_logout",formdata)
    .then(res=>{console.log(res.statusText)
    result =res.data;
    console.log("logout result",result);
    //browser.tabs.reload();
    // window.location.reload();
  })
}

//   if(JSON.parse(sessionStorage.getItem('state')).Loggedin === "false"){
//      this.Logout();
// }

  //if (window.localStorage) {
    // flag the page as being unloading
  //  window.localStorage['myUnloadEventFlag']=new Date().getTime();
  //  window.localStorage['logoutcancel']="false";
  //  this.executelogout();
//}

// notify the server that we want to disconnect the user in a few seconds (I used 5 seconds)
//askServerToDisconnectUserInAFewSeconds();
}
onload = (e) => {
 
  if (window.localStorage) {
    window.localStorage['myload']=new Date().getTime();
    var t0 = Number(window.localStorage['myUnloadEventFlag']);
   
    if (isNaN(t0)) t0=0;
    var t1=new Date().getTime();
    var duration=t1-t0;
    if (duration<10*1000) {
        // less than 10 seconds since the previous Unload event => it's a browser reload (so cancel the disconnection request)
       // askServerToCancelDisconnectionRequest(); // asynchronous AJAX call
       console.log("duration",duration,"",10000)
       window.localStorage['logoutcancel']="true";
       
       let username = JSON.parse(sessionStorage.getItem('state')).user_name;
       var result;
       let formdata =new FormData();
       formdata.append('user_name',username);
       Axios.post("http://192.168.0.5:8000/cancel_browserclose_logout",formdata)
       .then(res=>{console.log(res.statusText)
       result =res.data;
       console.log("logout result",result);
       //browser.tabs.reload();
       // window.location.reload();
     })
      // this.executelogout();
       

    } else {
        // last unload event was for a tab/window close => do whatever you want (I do nothing here)
    }
}
}
executelogout = (e) => { 


  // setTimeout( async => {
  //   if(window.localStorage['logoutcancel']==="false"){
  //    console.log(window.localStorage['logoutcancel'])
  //   this.Logout();
  //   }
  //   else{
  //     console.log("logout canceled")
  //   }
  // },10000);

}
componentDidUpdate = () => {
 
    window.onbeforeunload = undefined

}
componentDidMount() {
 
  window.addEventListener("beforeunload", this.onUnload);
  window.addEventListener("load", this.onload);
 //window.addEventListener("beforeunload", this.onUnload);


}

componentWillUnmount() {
// console.log(sessionStorage.getItem('state'))

  window.removeEventListener("beforeunload", this.onUnload);
  window.removeEventListener("load", this.onload);
  // console.log(sessionStorage.getItem('state'))
}
 
 Logout(){

  // if (window.confirm("Do you want to logout?")) { 
    console.log("Heeeeeeeeeeeeeeeeeeeeeheeeeeeeeeeee")
    let username = this.state.user_name;
    var result;
    let formdata =new FormData();
    formdata.append('user_name',username);
    Axios.post("http://192.168.0.5:8000/user_logout",formdata)
    .then(res=>{console.log(res.statusText)
    result =res.data;
    console.log("logout result",result);
    //browser.tabs.reload();
    window.location.reload();
  })
    sessionStorage.setItem("loaded",false)
    sessionStorage.removeItem('loaded');
    sessionStorage.removeItem('state');
    this.setState({ Loggedin: false,user_name: false })
// }
// else{
//  window.location.reload();
// }
 
 }
 callbackFunction = (childData,username) => {
  if( childData ==='true' ){
  
  this.setState({ Loggedin: childData,user_name: username})  // username.replace(/^./, username[0].toUpperCase())
  this.onUnload();
  }
  else
    console.log("Else in Callback "+childData);
}


menuchange(menuitem,i){

// console.log(menuitem)



    this.setState({ CurComp: menuitem })

    // var ele = document.getElementById(i)
    // ele.classList.add('orange')
   
 
 
}

render(){
 // console.log("username is" ,this.state.user_name)
  return (
    <div>
    <div className="App" id="appid" >
      <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
        <h2 className="header-Text">  Chat App <br/></h2>
        <span className="username " >  {this.state.user_name}</span>  
        
  {this.state.Loggedin && <button  id="submit" className="Logout" value="Login" onClick={() => this.Logout()}>Logout </button>} 
  
      </header>
  {this.state.Loggedin &&    <ChatBox  sendername={this.state.user_name}/> } 


{this.state.Loggedin ? <div  className="App-body"> 
  {this.state.CurComp} </div> :
   <div  className="App-login-body"><Login parentCallback = {this.callbackFunction}/> 
     </div> }
    </div>
    </div>
  );
}
}
export default App;
