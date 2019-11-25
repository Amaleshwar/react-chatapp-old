import React, { Component } from 'react';
import './App.css';
import ReactPlayer from 'react-player'
import video from './images/trailer_hd.mp4';



export default class Videoplayer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playing: false,
            controls: true,
         }
    }
    pauseorplay(){
        console.log('render ')
       this.setState({playing:!this.state.playing})  
    }
    handlekeypress(e){
        console.log(e.key);
        if(e.key === 'ArrowRight'){
            console.log('2 enter press here! ')
          }
        if(e.key === 'ArrowLeft'){
            console.log('3 enter press here! ')
          }
    }
    
    render() {
        return (
            <div className="vidplay-app"  onKeyDown={(e)=>this.handlekeypress(e)}>
                <div className="vidplay-wrapper"> 
                        <h3>React Player.. </h3>
                        <ReactPlayer url={video} playing={this.state.playing} controls={this.state.controls} 
                        onKeyDown={(e)=>this.handlekeypress(e)} onClick={()=>this.pauseorplay()} />
                </div>
            </div>
        );
    }
}
