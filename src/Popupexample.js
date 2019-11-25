import React, { Component } from 'react';
import './App.css';
import Popup from "reactjs-popup";
import Downloadimage from "./Downloadimage";




export default class Popupexample extends Component {
    constructor(props) {
        super(props);
        this.state ={
            popupToggle:false,
        };
    }

    handlePopupToggle(){
    
    this.setState({popupToggle: !this.state.popupToggle})
    console.log(1);
    }

    render() { 
        return ( 
        <div className="popup-app">

            
           <div className="popup-wrapper"> 
                <button onClick={()=>this.handlePopupToggle()}>popup without Library and without transparent</button>
                { /* no need of div with class name of "popup"  */ }
                { this.state.popupToggle && 
                <div className='popup_inner'>
                     <Downloadimage text='Close Me'  frompopup={true} />
                    <button onClick={()=>this.handlePopupToggle()}>close me</button>              
                </div> }
            </div>

 
            <div className="popup-wrapper"> 
                <button onClick={()=>this.handlePopupToggle()}>popup without Library</button>
                { this.state.popupToggle && 
                <div className='popup'>
                <div className='popup_inner'>
                     <Downloadimage text='Close Me'  frompopup={true} />
                    <button onClick={()=>this.handlePopupToggle()}>close me</button>
                </div>
                </div> }
            </div>


 
            <div className="popup-wrapper"> 
                <Popup trigger={<button> popup @ Library</button>} position="right center"> 
                    <div style={{color:"black"}}>Popup content here !!</div>
                </Popup>

               </div>
        </div> 
        );
    }
}
 
