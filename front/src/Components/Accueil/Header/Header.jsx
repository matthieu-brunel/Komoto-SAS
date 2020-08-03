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

  getData = async () => {
    const { locale, language_id } = this.props;

    let data = await getRessources('homepage', 'header', language_id);

    const description = data.length > 0 && JSON.parse(data[0].description);
    const clickDown = description.clickDown;
    const titleHeader = description.titleHeader;

    this.setState({
      header: data,
      clickDown: clickDown,
      titleHeader: titleHeader
    })
  }

  componentDidMount = async () => {
    this.getData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.language_id !== this.props.language_id) {
      this.getData();
    }
  }

  render() {
    const { locale, idLang, language_id } = this.props;
    const { header } = this.state;

    return (
      <div id="container-header" className="container-div-img-header">
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
          <SavoirFaireAccueil locale={locale} language_id={language_id}/>
        </div>
      </div>


    )
  }
}

export default HeaderAccueil;