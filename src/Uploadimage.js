import React, { Component } from 'react';
import './App.css';
// const axios = require("axios");
import axios from 'axios';




export default class Uploadimage extends Component {
    constructor(props) {
        super(props);
        this.state ={
            selectedFile: null,
            btndisable:true,
            msgflag:false,
        };
    }
    onFormSubmit(e){
       const data = new FormData();
       data.append('file2',this.state.selectedFile);

       axios.post("http://localhost:8000/upload",data).then(res=>{console.log(res.statusText,res.data)})
        
    }
    onChange(e) {
        if(e.target.files[0].size>52000)
        {
                alert(" can't upload ")
                this.setState({btndisable:true,msgflag:true});
                return;
        }
        else
        {
          this.setState({
              selectedFile:e.target.files[0],
              btndisable:false,
              msgflag:false,
        });
        }
        console.log(e.target.files[0].size, e.target.files[0].name)

        
    }

    render() { 
        return ( 
        <div className="upimg-app">
            <div className="upimg-wrapper"> 

                <p>File Upload</p>
                <input type="file" name="file" onChange={(e)=>this.onChange(e)} /> {/* use "multiple"  for uploading multipule files  */}
                <button disabled={this.state.btndisable} type="button" onClick={(e)=>this.onFormSubmit(e)}>Upload</button>

      
               {this.state.msgflag && <div> <p style={{color:"Red"}}>File too large.</p> <p>Please, Upload correct File </p> </div>}
               </div>
        </div> 
        );
    }
}
 
