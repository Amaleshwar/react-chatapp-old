import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './Login';
import Axios from 'axios';

import ChatBox from "./ChatBox";
import util from './util.js';
const ipaddress= util.ipaddress;

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
  
  if(sessionStorage.getItem("refresh") === null){
    sessionStorage.setItem("refresh", false);
  }
  else{
    sessionStorage.setItem("refresh", true);
    this.Logout()
    
  }
//   if (('sessionStorage' in window) && window['sessionStorage'] !== null) {
//     //get value from localstorage using getItem and allow/deny the further access
//     console.log(sessionStorage.getItem('state'));
//  }
 // console.log(sessionStorage.getItem('state'));
  try{

    if (window.confirm("Do you want to logout?")) { 
          this.Logout();
    }
    else{
       window.location.reload();
    }
  //   e.preventDefault();
  //  var message = ''    //   'Warning!\n\nNavigating away from this page will delete your text if you haven\'t already saved it.';
  //  e.returnValue = message;
  //  return ;// message;
  }
  catch(error){
      console.log("error")
  }

}
componentDidMount() {
 //console.log(sessionStorage.getItem('state'))
 //console.log(sessionStorage.getItem('user'))
 console.log(sessionStorage.getItem("refresh"));
 window.addEventListener("beforeunload", this.onUnload);
 console.log(sessionStorage.getItem("refresh"));
//  if(sessionStorage.getItem("refresh")=== "true"){
//    if (window.confirm("Do You want to Logout?  Then Press Yes or to Just refresh Press cancel ")) {
//     console.log("want to logout");
//     sessionStorage.setItem("refresh", false);
//   } else {
//     console.log("Just Refersh");
//     sessionStorage.setItem("refresh", false);
//   }
//   }
 //console.log(sessionStorage.getItem('state'));
 //console.log(JSON.parse(sessionStorage.getItem('state')));
}

componentWillUnmount() {
// console.log(sessionStorage.getItem('state'))
  window.removeEventListener("beforeunload", this.onUnload)
  // console.log(sessionStorage.getItem('state'))
}
 
 Logout(){

  // if (window.confirm("Do you want to logout?")) { 
    
    let username = this.state.user_name;
    var result;
    let formdata =new FormData();
    formdata.append('user_name',username);
    Axios.post(`http://${ipaddress}:8000/user_logout`,formdata)
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
