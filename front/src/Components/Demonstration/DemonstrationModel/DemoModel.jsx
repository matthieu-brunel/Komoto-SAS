import React, { Component } from 'react';
import './DemoModel.css';
import Rendu from "./Rendu";
import getRessources from "../../../utils/getRessources";
import { UncontrolledButtonDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap';
import { Button } from 'reactstrap';

class DemoModel extends Component {
  constructor() {
    super();
    this.state = {
      showroom: [],
      model_seleted: "",
      model_image: "",
      image_alt: "",
      chose_image: "default",
      showroom_text: [],
      root : window.location.origin + "/model/"

    };

  }
  componentDidMount = async () => {

    const { locale } = this.props;
    let data = await getRessources("demonstration", "demonstration_model", locale);
    let data_text = await getRessources("demonstration/text", "demonstration_text", locale);

    for (let i = 0; i < data_text.length; i++) {
      this.getTextToList(data, data_text[i]);
    }


  };

  getTextToList(data_model, data_text) {
    //variable objet qui servira à accueillir les données
    let objet = data_text;
    //variable array_description qui servira a convertir le contenu description en tableau grace au slash
    let array_description = data_text.description.split('/');
    //on remplace le contenu description de l'objet.description par la nouvelle description
    objet.description = array_description;
    //on met a jour le state avec la nouvelle valeur [specialisation=state:[...this.state.specialisation=state actuel,objet=variable objet qui contient les nouvelles données]]

    this.setState({
      showroom_text: [...this.state.showroom_text, objet],
      showroom: data_model
    });

  }

  handlerChangeModel = (event) => {

    //console.log("handlerChangeModel : ",event);
    //console.log("model selectionné : ",this.state.showroom[event.target.value].model_url);
    if (event.target.value !== "default") {
      this.setState({
        model_seleted: this.state.showroom[event.target.value].model_url,
        model_image: this.state.showroom[event.target.value].url,
        image_alt: this.state.showroom[event.target.value].alt,

      })
    }
    this.setState({
      chose_image: event.target.value
    })

  }


  render() {
    const { showroom_text } = this.state;
    return (
      <div className="">
        {this.state.showroom.length > 0 &&
          <div>
            <div className="show-title">
              <h2 className="show-title-text">{showroom_text.length > 0 && showroom_text[0].title}</h2>
            </div>
            <div className="pt-5">
              <div className="container">
                <h5>{showroom_text.length > 0 && showroom_text[0].subtitle}</h5>
              </div>
              <div className="pt-5 pb-5 container descrption-show">
                <p>{showroom_text.length > 0 && showroom_text[0].description[0]}</p>
              </div>

            </div>
          </div>}
        <div className="form-group">

          <select className="form-control container" id="exampleFormControlSelect1" onChange={this.handlerChangeModel}>
            <option value="default" >---</option>
            {this.state.showroom.length > 0 ?
              this.state.showroom.map((model, index) =>
                <option key={index} value={index} >{model.model_alt}</option>
              )
              : ""}
          </select>
        </div>
        {this.state.chose_image === "default" ? <div>{showroom_text.length > 0 && showroom_text[0].description[2]}</div> :
          <div>
            <Rendu model_name={this.state.model_seleted} root={this.state.root} />
            <div className="pt-5 container">
              <img className="img-show" src={this.state.model_image} alt={this.state.image_alt} />
            </div>
          </div>}

      </div>
    );
  }
}



export default DemoModel;



