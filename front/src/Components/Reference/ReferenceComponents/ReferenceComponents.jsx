import React, { Fragment} from 'react';
import './ReferenceComponents.css';



function ReferenceComponents({reference}) {
  //console.log(reference);
  return (
    <div className="container container-references mt-5">
      {reference.length > 0 ? reference.map((element, index) => (
        
        <div key={index} >
          <div id={element.url[index]} className="reference-div-vide"></div>
          <div className="div-header-reference d-flex justify-content-around mb-5">

            <div  className="div-logo-reference"><img  src={element.url[0]} alt={element.alt[0]} /></div>
            <div className="div-logo-solution"><img className="w-50" src={'/images/' + element.url[1]} alt={element.alt[1]} /></div>

          </div>

          <div className="container-main-reference">
            <div className="container div-subtitle-main-reference mb-5">{element.subtitle}</div>
            {/*DESCRIPTION LISTE*/}
            <div className="div-main-reference d-flex justify-content-around row">
              <div className="div-description-main-reference col-12 col-lg-6">
                {
                  
                element.description.map((liste, index) => liste.includes('/') ? (
                  
                  <ul className="text-lg-left">
                    {liste.split('/').map((el, index) => (
                      <li className="liste-reference p-2" key={index}>{el}</li>
                    ))}
                  </ul>
               ) 
                : 
                <h3 className="titre-texte-reference text-lg-left" key={index}>{liste}</h3>)}
                
              </div>

            {/*CAROUSSEL IMAGE*/}
              <div className="div-image-main-reference w-50 col-12 col-lg-6">
                <div id={element.name} class="carousel slide" data-ride="carousel">
                  <div class="carousel-inner">
                    <div class="carousel-item active">
                      <img class="d-block w-100" src={element.url.length > 0  ? '/images/reference/' + element.url[2] : ""} alt="First slide"/>
                    </div>
                    {element.url.map((image, index) => index >= 3 ? 
                                      <div class="carousel-item">
                                        <img class="d-block w-100 image-reference-caroussel" src={'/images/reference/' + image} alt="First slide"/>
                                      </div>
                                      :
                                      "")
                    }

                  </div>
                  <a class="carousel-control-prev" href={'#' + element.name} role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                  </a>
                  <a class="carousel-control-next" href={'#' + element.name} role="button" data-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                  </a>
                </div>
              </div>
            </div>
            

            <hr   className="mt-5 mb-5"></hr>
          </div>
        </div>
      )) 
      : 
      " pas de partenaire de disponible"}
    </div>
  );
}

export default ReferenceComponents;