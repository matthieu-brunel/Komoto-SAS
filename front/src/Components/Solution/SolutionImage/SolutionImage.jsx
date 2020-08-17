import React, { Component } from 'react';
import './SolutionImage.css';
import $ from "jquery";

const REACT_APP_SERVER_ADDRESS_FULL = process.env.REACT_APP_SERVER_ADDRESS_FULL;




class SolutionImage extends Component {

  componentDidMount = () => {

  }

  render() {
    const { image } = this.props;

    return (

      <div className="container container-image-solution text-center mb-5">
        {
          image.length > 0 ? image.map((image, index) => (

            <div key={index} className="div-image-solution">
              {image !== 'logo.png' ? <img id={index} className="img-solution" src={REACT_APP_SERVER_ADDRESS_FULL + '/images/' + image.name} alt={image.alt} onClick={this.props.handleClickImg} /> : ""}
            </div>


          )) : ""}

      </div>

    );
  }
}



export default SolutionImage;