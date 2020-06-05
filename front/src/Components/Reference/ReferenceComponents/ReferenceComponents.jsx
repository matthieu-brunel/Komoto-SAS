import React from 'react';
import './ReferenceComponents.css';
const REACT_APP_SERVER_ADDRESS_FULL = process.env.REACT_APP_SERVER_ADDRESS_FULL;


function ReferenceComponents({ reference }) {
  console.log(reference);
  return (
    <div className="container">
      {
        reference.map((element, index) => (
          <div key={index}>
            <div id={element.name} className="reference-div-vide"></div>
            <div className=" d-flex justify-content-around  ">
              <div className="logoRef">
                <img className="imgRef" src={REACT_APP_SERVER_ADDRESS_FULL + "/images/" + element.url.logoRef[0].name} alt={element.url.logoRef[0].alt} />
              </div>
              <div className="logoRef">
                <img className="imgRef" src={REACT_APP_SERVER_ADDRESS_FULL + "/images/" + element.url.logoSolution[0].name} alt={element.url.logoSolution[0].alt} />
              </div>
            </div>

          <div>
              {/*CAROUSSEL IMAGE*/}
              <div className="pt-5 pb-5 ">
                <div id={element.url.imageCaroussel[0].name} class="carousel slide " data-ride="carousel">
                 
                  <div class="carousel-inner carouWidth">
                    <div className="carousel-item active">
                      <img className="d-block carouList " src={element.url.imageCaroussel.length > 0 ? REACT_APP_SERVER_ADDRESS_FULL + "/images/" + element.url.imageCaroussel[0].name : ""} alt={element.url.imageCaroussel[0].alt} />
                    </div>
                    {
                      element.url.imageCaroussel.map((image, index) => {
                        if (index >= 1) {
                          return (
                            <div key={index} className="carousel-item">
                              <img className="d-block carouList " src={REACT_APP_SERVER_ADDRESS_FULL + "/images/" + image.name} alt={image.alt} />
                            </div>
                          )
                        }
                      })
                    } 
                  <a class="carousel-control-prev" href={`#${element.url.imageCaroussel[0].name}`} role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                  </a>
                  <a class="carousel-control-next" href={`#${element.url.imageCaroussel[0].name}`} role="button" data-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                  </a>
                  </div>
                </div>
              </div>
          </div>


            <div className=" ">
              {/*DESCRIPTION LISTE*/}
              <div className=" d-flex justify-content-around row  ">
                <div className="">
                  {
                    element.description.map((objet, index2) => (
                      <div key={index2}>
                        <div className="p-3 ">
                          <h3 className="">{objet.title}</h3>
                        </div>
                        <div className="">
                          {
                            objet.description.map((list, index3) => (
                              <div key={index3}>
                                <p className="">{list}</p>
                              </div>
                            ))
                          }
                        </div>
                      </div>
                    ))
                  }
                  <div>
                    <hr/>
                  </div>
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






