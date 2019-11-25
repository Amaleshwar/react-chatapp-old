import React, { Component } from "react";
import "./App.css";
import axios from "axios";

import { Carousel } from "react-bootstrap";

// import image1 from './images/atoms-background.png';
// import image2 from './images/hexagon-chemical.jpg';
// import image3 from './images/Quantum_Blog-toffoli.png';
var image1 =
  "https://images.unsplash.com/photo-1569387623950-11c5f5be2f38?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80";
var image2 =
  "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60";
var image3 =
  "https://images.unsplash.com/photo-1516905041604-7935af78f572?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60";
var image4 =
  "https://images.unsplash.com/photo-1539683255143-73a6b838b106?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60";

export default class Imageslide extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [image1, image2, image3],
      counter: 0
    };
  }
  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({
        counter: ++this.state.counter % this.state.images.length
      });
    }, 5000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  previmg() {
    if (this.state.counter === 0) {
      this.setState({ counter: this.state.images.length - 1 });
    } else {
      this.setState({ counter: this.state.counter - 1 });
    }
  }
  nextimg() {
    if (this.state.counter === this.state.images.length - 1) {
      this.setState({ counter: 0 });
    } else {
      this.setState({ counter: this.state.counter + 1 });
    }
  }
  render() {
    return (
      <div className="imgslide-app">
        <h2> Carousel Using react-bootstrap </h2>
        <Carousel fade={false} className="imgslide-wrapper">
          <Carousel.Item>
            <img
              height="242"
              width="100%"
              className=" "
              src={image1}
              alt="First slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              height="242"
              width="100%"
              className=""
              src={image2}
              alt="Second slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              height="242"
              width="100%"
              className=" "
              src={image3}
              alt="Third slide"
            />
          </Carousel.Item>
        </Carousel>
        <h2> Carousel without Library </h2>
        <div className="imgslide-app">
          <div className="imgslide-wrapper">
            <img
              src={this.state.images[this.state.counter]}
              alt="Smiley face"
              height="242"
              width="100%"
            />
            <button onClick={() => this.previmg()}>prev</button>
            <button onClick={() => this.nextimg()}>next</button>
          </div>
          <h2> Carousel using bootstarp </h2>
          <div
            id="carouselExampleCaptions"
            className="carousel slide"
            data-ride="carousel"
          >
            <ol className="carousel-indicators">
              <li
                data-target="#carouselExampleCaptions"
                data-slide-to="0"
                className="active"
              ></li>
              <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
              <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
            </ol>
            <div className="carousel-inner">
              <div className="carousel-item active" data-interval="5000">
                <img src={image1} className="d-block w-100" alt="..." />
                <div className="carousel-caption d-none d-md-block">
                  <h5>First slide label</h5>
                  <p>
                    Nulla vitae elit libero, a pharetra augue mollis interdum.
                  </p>
                </div>
              </div>
              <div className="carousel-item" data-interval="5000">
                <img src={image2} className="d-block w-100" alt="..." />
                <div className="carousel-caption d-none d-md-block">
                  <h5>Second slide label</h5>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                </div>
              </div>
              <div className="carousel-item" data-interval="5000">
                <img src={image3} className="d-block w-100" alt="..." />
                <div className="carousel-caption d-none d-md-block">
                  <h5>Third slide label</h5>
                  <p>
                    Praesent commodo cursus magna, vel scelerisque nisl
                    consectetur.
                  </p>
                </div>
              </div>
            </div>
            <a
              className="carousel-control-prev"
              href="#carouselExampleCaptions"
              role="button"
              data-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="sr-only">Previous</span>
            </a>
            <a
              className="carousel-control-next"
              href="#carouselExampleCaptions"
              role="button"
              data-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="sr-only">Next</span>
            </a>
          </div>
        </div>
      </div>
    );
  }
}
