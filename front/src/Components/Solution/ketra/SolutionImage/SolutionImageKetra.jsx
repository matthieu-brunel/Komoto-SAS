import React, { Component } from 'react';
import './SolutionImageKetra.css';



class SolutionImage extends Component {
  render(){
    const { image } = this.props;
    console.log()
    return (
      <div className="container-image-solution-ketra">
        {image.map((image, index) => (
          <div className="div-image-solution-ketra">
            <img src={'/images/'+image} alt={image.alt} />
          </div>
        ))}
      </div>
    );
  }

}

export default SolutionImage;