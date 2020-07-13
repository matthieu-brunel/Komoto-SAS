import React, { Component } from 'react';
import './Header.css';
import SavoirFaireAccueil from './../Savoir-faire/Savoir-faire';
import getRessources from '../../../utils/getRessources';



class HeaderAccueil extends Component {
  constructor(props) {
    super(props)
    this.state = {
      header: []
    }

  }

  componentDidMount = async () => {
    const { locale } = this.props;

    let data = await getRessources('homepage', 'header', locale);

    this.setState({
      header: data
    })
  }

  render() {
    const { locale } = this.props;
    const { header } = this.state;
    //console.log("langue selectionnée : ", locale);
    console.log("header : ", header);

    return (
      <div className="container-div-img-header">
        <div className="div-background-image" style={{ 'backgroundImage': `linear-gradient(to right, rgba(0,0,0,1) 40%, rgba(0,0,0,0.5)), url(${header.length > 0 ? header[0].url : ""})` }}>
          <div className="div-text-h1-accueil">
            <h1 className="text-accueil text-white">{header.length > 0 ? header[0].description : ""}</h1>
          </div>
        </div>
        <div className="section-savoirFaire-accueil">
{/*           <SavoirFaireAccueil locale={locale} />
 */}        </div>
      </div>


    )
  }
}

export default HeaderAccueil;