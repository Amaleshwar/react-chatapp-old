import React, { Component } from 'react';
import './App.css';
import Switch from "react-switch";


var timeoptions ={
    hour12 : false,
}

export default class Clock extends Component{
        constructor(props) {
            super(props);
            this.state = { 
                time: new Date().toLocaleString(),
                timeonly: new Date().toLocaleTimeString("en-US",timeoptions),
                dateonly:new Date().toDateString(),
                checked: false,
             }
             this.handleChange = this.handleChange.bind(this);
        }
        
        tick(){
            this.setState({
                time: new Date().toLocaleString(),
                timeonly: new Date().toLocaleTimeString("en-US",timeoptions),
                dateonly:new Date().toDateString(),
            })
        }
        componentDidMount(){
            this.timeintervalid=setInterval(
                ()=>this.tick(),1000
            )
        }
        componentWillUnmount(){
            clearInterval(this.timeintervalid);
        }

        handleChange(checked) {
            this.setState({ checked:checked });
            timeoptions.hour12=!(timeoptions.hour12);
          }
         

        render() { 
            
            return (  
                <div className="clock-app">
                    <div className="clock-wrapper">
                    <div className="date-display">{this.state.dateonly}</div>
                     <div className="time-display">{this.state.timeonly}</div>
                    </div>
                    <div className="switch-toggle">
                    <Switch onChange={this.handleChange} checked={this.state.checked} 
                        id="normal-switch" checkedIcon={<div style={{textAlign:"center", justifyContent: "center",
                        alignItems: "center"}}>12H</div>} 
                        uncheckedIcon={<div style={{textAlign:"center", justifyContent: "center",
                        alignItems: "center"}}>24H</div>}  height={20}
                        width={50}/>
                    </div>
                </div>
            );
        }
    }
