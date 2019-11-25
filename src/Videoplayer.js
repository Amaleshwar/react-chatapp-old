import React, { Component } from 'react';
import './App.css';
import { Player } from  'video-react';
//import video from 'http://techslides.com/demos/sample-videos/small.webm'; // paste video addtess or location


export default class Videoplayer extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (  
            <div className="vidplay-app">
                <div className="vidplay-wrapper"> 
                        <h3>Video Player........................................................</h3>
                       {/* <Player>
                            <source src={video} />
                        </Player> */}
                </div>
            </div>
        );
    }
}
