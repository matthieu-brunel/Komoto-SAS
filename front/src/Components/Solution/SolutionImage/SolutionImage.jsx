import React, { Component } from 'react';
import './SolutionImage.css';
const REACT_APP_SERVER_ADDRESS_FULL = process.env.REACT_APP_SERVER_ADDRESS_FULL;


class SolutionImage extends Component {
  render(){
    const { image } = this.props;
    console.log("image", image.length > 0 ? image:"")
    return (
      <div className="container container-image-solution text-center">
         {image.length > 0 ? image.map((image, index) => (
          <div key={index} className="div-image-solution">
            {image !== 'logo.png' ? <img  className="img-solution" src={REACT_APP_SERVER_ADDRESS_FULL +'/images/'+image.name} alt={image.alt} /> : ""}
          </div>
        )):""} 
      </div>
    );
  }

}

export default SolutionImage;