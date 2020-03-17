import React, { Component } from 'react';
import './SolutionImageKetra.css';



class SolutionImage extends Component {
  render(){
    const { image } = this.props;

    return (
      <div className="container container-image-solution-ketra">
        {image.map((image, index) => (
          <div key={index} className="div-image-solution-ketra">
            {image != 'logo.png' ? <img  className="img-solution-ketra" src={'/images/'+image} alt={image.alt} /> : ""}
          </div>
        ))}
      </div>
    );
  }

}

export default SolutionImage;