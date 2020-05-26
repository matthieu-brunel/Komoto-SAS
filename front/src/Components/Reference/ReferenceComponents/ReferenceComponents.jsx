import React from 'react';
import './ReferenceComponents.css';
const REACT_APP_SERVER_ADDRESS_FULL = process.env.REACT_APP_SERVER_ADDRESS_FULL;


function ReferenceComponents({ reference }) {
  console.log(reference);
  return (
    <div className="container container-references mt-5">
      {
        reference.map((element, index) => (
          <div key={index}>
            <div id={element.name} className="reference-div-vide"></div>
            <div className="div-header-reference d-flex justify-content-around align-items-center pb-5">
              <div className="div-logo-reference-page"><img src={REACT_APP_SERVER_ADDRESS_FULL + "/images/" + element.url.logoRef[0].name} alt={element.url.logoRef[0].alt} /></div>
              <div className="div-logo-solution-page"><img src={REACT_APP_SERVER_ADDRESS_FULL + "/images/" + element.url.logoSolution[0].name} alt={element.url.logoSolution[0].alt} /></div>
            </div>

            <div className="container-main-reference">
              {/*DESCRIPTION LISTE*/}
              <div className="div-main-reference d-flex justify-content-around row">
                <div className="div-description-main-reference col-12 col-lg-6">
                  {
                    element.description.map((objet, index2) => (
                      <div key={index2}>
                        <div className="div-description-reference-title p-3">
                          <h3 className="title-description-reference">{objet.title}</h3>
                        </div>
                        <div className="div-description-reference-list">
                          {
                            objet.description.map((list, index3) => (
                              <div key={index3}>
                                <p className="p-description-list-reference">{list}</p>
                              </div>
                            ))
                          }
                        </div>
                      </div>
                    ))
                  }
                </div>
              </div>

              {/*CAROUSSEL IMAGE*/}
              <div className="div-image-main-reference w-100 col-sm-12 col-lg-6 pt-5">
                <div id={element.url.imageCaroussel[0].name} className="carousel slide" data-ride="carousel">
                  <div className="carousel-inner">
                    <div className="carousel-item active">
                      <img className="d-block w-100" src={element.url.imageCaroussel.length > 0 ? REACT_APP_SERVER_ADDRESS_FULL + "/images/" + element.url.imageCaroussel[0].name : ""} alt={element.url.imageCaroussel[0].alt} />
                    </div>
                    {
                      element.url.imageCaroussel.map((image, index) => {
                        if (index >= 1) {
                          return (
                            <div key={index} className="carousel-item">
                              <img className="d-block w-100 image-reference-caroussel" src={REACT_APP_SERVER_ADDRESS_FULL + "/images/" + image.name} alt={image.alt} />
                            </div>
                          )
                        }
                      })
                    }
                  </div>
                  <a className="carousel-control-prev" href={`#${element.url.imageCaroussel[0].name}`} role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                  </a>
                  <a className="carousel-control-next" href={`#${element.url.imageCaroussel[0].name}`} role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))
      }
    </div >
  );
}

export default ReferenceComponents;