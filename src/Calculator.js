import React, { Component } from 'react';
import './App.css';
var ermsg=null ;

export default class Calculator extends Component{
            constructor(props) {
                super(props);
                this.state = { 
                    inptvalue:"",
                    errormsg:"",
                    btnstatus:false
             }
            }
           
            toinput(e){
                if(e==='+'||e==='/'||e==='*'||e==='-'||e==='.')
                {
                    this.setState({
                        inptvalue: this.state.inptvalue + e,
                        btnstatus:true
                    })
                }
                else{
                this.setState({
                    inptvalue: this.state.inptvalue + e,
                    btnstatus:false
                })
            }
            }

            clearallinput(){
                this.setState({
                    inptvalue: '',
                    errormsg:"",
                    btnstatus:false,
                })
                ermsg=null ;
            }
            clearinput(){
                let val= this.state.inptvalue;
                let len=val.slice(0,val.length-1);
                this.setState({
                    inptvalue: len,
                    errormsg:"",
                    btnstatus:false,
                })
                ermsg=null ;
            }
            doeval(){
                let val= this.state.inptvalue;
                console.log(val);
                console.log(this.state.inptvalue); 
                console.log(val.length);
                if(val.length===0)
                {
                    this.setState({
                        errormsg: "Inputs are not entered",
                    })
                }
                else
                {
                    try
                    {  
                            // eslint-disable-next-line 
                            var evaluate = eval(this.state.inptvalue);   
                            evaluate=evaluate.toString();
                    }
                    catch(error)
                    {
                               ermsg ="Enter correct Expresion";
                           
                    }
                    this.setState({
                        inptvalue:  ermsg? this.state.inptvalue:evaluate,
                          errormsg: ermsg,
                          btnstatus:false,
                    })                
            }
            }

            handleInputKeyDown(e){
                console.log(e.key);
                console.log(e.keyCode);
                if(e.keyCode === 8)
                {
                    this.clearinput();
                }
                else if(e.keyCode === 27)
                {
                    this.clearallinput();
                }
                else if(e.keyCode === 13)
                {
                    this.doeval();
                }
                else if( (e.keyCode >= 96 && e.keyCode <=111) ||(e.keyCode >= 48 && e.keyCode <=57)||e.keyCode===187||e.keyCode===189)
                {
                    if(e.keyCode ===107||e.keyCode===111||e.keyCode===106||e.keyCode===109||e.keyCode===110)
                    {
                        this.setState({
                            inptvalue: this.state.inptvalue + e.key,
                            btnstatus:true
                        })
                    }
                    else{
                    this.setState({
                        inptvalue: this.state.inptvalue + e.key,
                        btnstatus:false
                    })
                    }
                }
            }
            changehandle(){
                
            }
    
    render(){
                
        return(
            <div className="calc-app">
                    <div className="calc-wrapper">
                        <div className="row">                               
                            <input  value={this.state.inptvalue} placeholder=" Do Math" className="input"
                            onKeyDown={(e)=>this.handleInputKeyDown(e)} onChange={()=>this.changehandle()} ></input>
                        </div>
                        <div className="row">
                            <button  className="btn" onClick={(e)=>this.toinput(1)}>1</button>
                            <button  className="btn" onClick={(e)=>this.toinput(2)}>2</button>
                            <button  className="btn" onClick={(e)=>this.toinput(3)}>3</button>
                            <button className="btn operator" disabled={this.state.btnstatus} onClick={(e)=>this.toinput('/')}>/</button>
                        </div>
                        <div className="row">
                            <button  className="btn" onClick={(e)=>this.toinput(4)}>4</button>
                            <button  className="btn" onClick={(e)=>this.toinput(5)}>5</button>
                            <button  className="btn" onClick={(e)=>this.toinput(6)}>6</button>
                            <button className="btn operator" disabled={this.state.btnstatus} onClick={(e)=>this.toinput('*')}>*</button>
                        </div>
                        <div className="row">
                            <button  className="btn" onClick={(e)=>this.toinput(7)}>7</button>
                            <button  className="btn" onClick={(e)=>this.toinput(8)}>8</button>
                            <button  className="btn" onClick={(e)=>this.toinput(9)}>9</button>
                            <button className="btn operator" disabled={this.state.btnstatus} onClick={(e)=>this.toinput('-')}>-</button>
                        </div>
                        <div className="row">
                            <button  className="btn" disabled={this.state.btnstatus} onClick={(e)=>this.toinput('.')}>.</button>
                            <button  className="btn" onClick={(e)=>this.toinput(0)}>0</button>
                            <button  className="btn eval" onClick={(e)=>this.doeval()}>=</button>
                            <button className="btn operator" disabled={this.state.btnstatus} onClick={(e)=>this.toinput('+')}>+</button>
                        </div>
                        <div className="row">
                            <button className="btn clear" onClick={()=>this.clearallinput()}>CA</button>
                            <button className="btn clear" onClick={()=>this.clearinput()}>C</button>
                        </div>
                    </div>
                    <span className="errormsg">{this.state.errormsg}</span>
            </div>
        );
    }
}