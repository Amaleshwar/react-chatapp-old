import React from 'react';
import logo from './logo.svg';
import './App.css';
import  Calculator from './Calculator';
import Clock from './Clock';
import Login from './Login';

import ChatBox from "./ChatBox";


var button ='';


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { Loggedin: sessionStorage.getItem('state') ? JSON.parse(sessionStorage.getItem('state')).Loggedin : false,
                    temp:null,
                    CurComp: <ChatBox/>,
                    menucmpts:[
                              { compname:Clock, displayname:"Home" },
                              { compname:ChatBox, displayname:"ChatBox" },
                              { compname:Calculator, displayname:"Calculator"},
                            ],
                  }
    // this.state = { Loggedin: true,
    // temp:null,
    //}
  }


onUnload = (event) => {
  sessionStorage.setItem("state", JSON.stringify(this.state))
}
componentDidMount() {
 console.log(sessionStorage.getItem('state'))
 window.addEventListener("beforeunload", this.onUnload)
 //console.log(JSON.parse(sessionStorage.getItem('state')));
}

componentWillUnmount() {
// console.log(sessionStorage.getItem('state'))
  window.removeEventListener("beforeunload", this.onUnload)
  // console.log(sessionStorage.getItem('state'))
}
 
 Logout(){
  sessionStorage.setItem("loaded",false)
  sessionStorage.removeItem('loaded');
  this.setState({ Loggedin: false })
 }
 callbackFunction = (childData) => {
  if( childData ==='true' ){
  this.setState({ Loggedin: childData })
  this.onUnload();
  }
  else
  console.log("Else in Callback "+childData);
}


menuchange(menuitem,i){

 console.log(menuitem)
console.log(this.state.menucmpts.displayname)


    this.setState({ CurComp: menuitem })

    // var ele = document.getElementById(i)
    // ele.classList.add('orange')
   
 
 
}

render(){
  var menucmpts =this.state.menucmpts;
   //var menuitems =  this.state.menuitems.map((menuitem)=> <div id="menu-link" onClick={()=>this.menuchange(menuitem)}> {menuitem}</div> )
  
  return (
    <div>
    <div className="App" id="appid" >
      <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
        <h2 className="header-Text">  React App <br/></h2>
        
  {this.state.Loggedin &&  <button  id="submit" className="Logout" value="Login" onClick={() => this.Logout()}>Logout </button>} 
  
      </header>
  {this.state.Loggedin &&   <div className="Menu">  


          {menucmpts.map((menucmpt,i)=> <div id={i} className={"menu-link"} onClick={(e)=>this.menuchange(<menucmpt.compname/>,i)}>{menucmpt.displayname}</div>)}

       </div>}


{this.state.Loggedin ? <div  className="App-body"> 
  {this.state.CurComp} </div> :
   <div  className="App-login-body"><Login parentCallback = {this.callbackFunction}/>   </div> }
    </div>
    </div>
  );
}
}
export default App;
