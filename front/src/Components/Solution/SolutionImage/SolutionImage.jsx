import React, { Component } from 'react';
import './SolutionImage.css';



class SolutionImage extends Component {
  render(){
    const { image } = this.props;

    return (
      <div className="container container-image-solution">
        {image.map((image, index) => (
          <div key={index} className="div-image-solution">
            {image !== 'logo.png' ? <img  className="img-solution" src={'/images/'+image} alt={image.alt} /> : ""}
          </div>
        ))}
      </div>
    );
  }

}

export default SolutionImage;