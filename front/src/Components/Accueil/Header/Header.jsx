import React, { Component } from 'react';
import './Header.css';
import SavoirFaireAccueil from './../Savoir-faire/Savoir-faire';
import getRessources from '../../../utils/getRessources';
import { Link } from "react-scroll";
import AOS from 'aos';
import 'aos/dist/aos.css';
import ScrollAnimation from 'react-animate-on-scroll';
AOS.init();

class HeaderAccueil extends Component {
  constructor(props) {
    super(props)
    this.state = {
      header: [],
      clickDown: "",
      titleHeader: ""
    }

  }

  componentDidMount = async () => {
    const { locale } = this.props;

    let data = await getRessources('homepage', 'header', locale);
  
    const description = JSON.parse(data[0].description);
    const clickDown = description.clickDown;
    const titleHeader = description.titleHeader;
    console.log("titleHeader :", titleHeader);
    console.log("clickDown :", clickDown);
    this.setState({
      header: data,
      clickDown:clickDown,
      titleHeader:titleHeader
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
            <ScrollAnimation animateIn='fadeIn'>
              <h1 className="text-accueil text-center text-white">{this.state.titleHeader}</h1>
            </ScrollAnimation>
            <Link
              activeClass="active"
              to="container-header-savoirFaire"
              spy={true}
              smooth={true}
              offset={-150}
              duration={500}>

              <div className="arrow-container animated fadeInDown">
                <p className="label-arrow text-white text-center">{this.state.clickDown}</p>
                <div className="arrow-2">
                  <i className="fa fa-angle-down"></i>
                </div>
                <div className="arrow-1 animated hinge infinite zoomIn"></div>
              </div>
            </Link>
          </div>
        </div>

        <div className="section-savoirFaire-accueil">
          <SavoirFaireAccueil locale={locale} />
        </div>
      </div>


    )
  }
}

export default HeaderAccueil;