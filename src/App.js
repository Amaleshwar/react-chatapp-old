import React from 'react';
import logo from './logo.svg';
import './App.css';
import  Calculator from './Calculator';
import Clock from './Clock';
import Uploadimage from './Uploadimage';
import Login from './Login';
import Videoplayer from './Videoplayer';
import ReactVPlayer from './ReactVPlayer';
import Downloadimage from "./Downloadimage";
import Popupexample from "./Popupexample";
import Imageslide from "./imageslide";
import { throwStatement } from '@babel/types';

var button ='';


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { Loggedin: sessionStorage.getItem('state') ? JSON.parse(sessionStorage.getItem('state')).Loggedin : false,
                    temp:null,
                    CurComp: <Clock/>,
                    menucmpts:[
                              { compname:Clock, displayname:"Home" },
                              { compname:Calculator, displayname:"Calculator"},
                              { compname:Uploadimage , displayname:"Upload Image" },
                              { compname:Downloadimage, displayname:"Download Image" },
                              { compname:ReactVPlayer, displayname:"Video Player"  },
                              { compname:Popupexample, displayname:"Popup"  },
                              { compname:Imageslide, displayname:"Carousel"  },
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
          {/* 
          <div id="menu-link" className="0" onClick={(e)=>this.menuchange(<Clock />,0,e)}> Home</div>
          <div id="menu-link" className="1" onClick={(e)=>this.menuchange(<Calculator />,1,e)}> Calculator</div>
          <div id="menu-link" className="2" onClick={(e)=>this.menuchange(<Uploadimage />,2,e)}> Upload Image</div>
          <div id="menu-link" className="3" onClick={()=>this.menuchange(<Downloadimage/>,3)}> Download Image</div>
          <div id="menu-link" className="4" onClick={()=>this.menuchange(<ReactVPlayer/>,4)}> Video Player</div>
          <div id="menu-link" className="5" onClick={()=>this.menuchange(<Popupexample/>,5)}> Popup</div>
          <div id="menu-link" className="6" onClick={()=>this.menuchange(<Imageslide/>,6)}> Carousel</div> */}

          {menucmpts.map((menucmpt,i)=> <div id={i} className={"menu-link"} onClick={(e)=>this.menuchange(<menucmpt.compname/>,i)}>{menucmpt.displayname}</div>)}

       </div>}
      {/* Ternary operator */}
       {/*
{this.state.Loggedin ? <div  className="App-body"> 
 <Calculator /> <Clock /> <Uploadimage />  <Videoplayer/> <ReactVPlayer/></div> :
   <div  className="App-body"> <Login parentCallback = {this.callbackFunction}/>   <Clock />  </div> }   */}


{this.state.Loggedin ? <div  className="App-body"> 
  {this.state.CurComp} </div> :
   <div  className="App-login-body"> <Login parentCallback = {this.callbackFunction}/>   </div> }
    </div>
    </div>
  );
}
}
export default App;
