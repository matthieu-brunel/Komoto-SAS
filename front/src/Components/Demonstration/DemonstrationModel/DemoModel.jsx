import React, { Component } from 'react';
import './DemoModel.css';
import Rendu from "./Rendu";
import getRessources from "../../../utils/getRessources";


class DemoModel extends Component {
  _isMounted = false;
  constructor() {
    super();
    this.state = {
      showroom: [],
      model_seleted: "",
      model_image: "",
      image_alt: "",
      chose_image: "default",
      showroom_text: [],
      root: /* window.location.origin + "/model/" */"http://localhost:5000/model/",
      description_text: "",
      labelBtn: ""
    };

  }

  componentWillUnmount() {
    this._isMounted = false;
    this.setState = (state, callback) => {
      return;
    };
  }
  
  componentDidMount = async () => {

    const { locale, language_id } = this.props;
    let dataModel = await getRessources("demonstration", "demonstration_model", language_id);
    let data_text = await getRessources("demonstration/text", "demonstration_text", language_id);
    console.log(data_text);
    console.log(dataModel);

    let objDescription = data_text.length > 0 ? JSON.parse(data_text[0].description) : null;
    let description;
    let labelBtn;
    let arrayObj = [];
    arrayObj.push(objDescription);

    if (arrayObj.length > 0) {
      description = objDescription !== null ? objDescription.description : "";
      labelBtn = objDescription !== null ?  objDescription.labelMenuDrop : "";
    }

    let arrayDataShowroom = [];

    for (let data of dataModel) {
      arrayDataShowroom.push(data);
    }

    this.setState({
      showroom_text: data_text,
      description: description,
      labelBtn: labelBtn,
      showroom: arrayDataShowroom
    });

  };


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
    const { showroom_text, description, labelBtn, model_seleted, root } = this.state;

    return (
      <div className="">
                {showroom_text.length > 0 &&
          <div>
            <div className="show-title">
              <h2 className="show-title-text">{showroom_text.length > 0 && showroom_text[0].title}</h2>
            </div>
            <div className="pt-5">
              <div className="pt-5 pb-5 container descrption-show">
                <p>{description}</p>
              </div>

            </div>
          </div>}
        <div className="form-group">

          <select className="form-control container" id="exampleFormControlSelect1" onChange={this.handlerChangeModel}>
            <option value="default" >{labelBtn}</option>
            {this.state.showroom.length > 0 ?
              this.state.showroom.map((model, index) =>
                <option key={index} value={index} >{model.model_alt}</option>
              )
              : ""}
          </select>
        </div>

        {this.state.chose_image === "default" ? <div></div> :
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



