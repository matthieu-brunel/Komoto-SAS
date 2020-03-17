import React, { Component } from 'react';
import './SolutionImagekroco.css';



class SolutionImage extends Component {
  render(){
    const { image } = this.props;

    return (
      <div className="container container-image-solution-kroco">
        {image.map((image, index) => (
          <div key={index} className="div-image-solution-kroco">
            {image != 'logo.png' ? <img  className="img-solution-kroco" src={'/images/'+image} alt={image.alt} /> : ""}
          </div>
        ))}
      </div>
    );
  }

}

export default SolutionImage;