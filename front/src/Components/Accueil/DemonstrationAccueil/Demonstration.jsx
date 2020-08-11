import React, { Component } from "react";
import "./Demonstration.css";
import getRessources from "../../../utils/getRessources";



class DemonstrationAccueil extends Component {
  _isMounted = false;
  constructor() {
    super();
    this.state = {
      demonstration: []
    };
  }


  componentDidMount = () => {
    this.getData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.idLang !== this.props.idLang) {
      this.getData();
    }
  }

  getData = async() => {
    this._isMounted = true;
    const { locale, language_id} = this.props;
    let data = await getRessources("homepage", "demonstration", language_id);

    this.setState({
      demonstration: data
    });
  }

  componentWillUnmount(){
    this._isMounted = false;
    this.setState = (state,callback)=>{
      return;
  };
  }
  
  render() {
    return (
      <div className="text-center p-5">
        {this.state.demonstration.length > 0 && <div className="demo-title"
          data-aos="fade-up"
          data-aos-duration="500"
          data-aos-easing="ease-in-out"><h2 className="demo-title-text">{this.state.demonstration[0].title}</h2></div>}
        {this.state.demonstration.map((demonstration, index) => {
          return (
            <div key={index}
              data-aos="fade-up"
              data-aos-duration="500"
              data-aos-easing="ease-in-out">

              <div className="container all-demo">
                <div className="demo-img pt-5">
                  <img className="img-demonstration" src={demonstration.url} alt={demonstration.alt} />
                </div>
                <div className="demo-text pt-4">
                  <div>
                    <h3 className="text-subtitle-demonstration">{demonstration.subtitle}</h3>
                  </div>
                  <div className="div-description-demonstration-accueil">
                    <p className="p-description-demonstration-accueil">{demonstration.description}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default DemonstrationAccueil;
