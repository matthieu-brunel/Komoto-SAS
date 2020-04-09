import React, { Component } from 'react';
import './DemoModel.css';
import getRessources from "../../../utils/getRessources";
import { UncontrolledButtonDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap';
import { Button } from 'reactstrap';

class DemoModel extends Component {
  _isMounted = false;
  constructor() {
    super();
    this.state = {
      showroom: [],
      model_seleted:"",
      model_image:"",
      image_alt:"",
      chose_image:"default",
      
    };

  }
  componentDidMount = async () => {
    this._isMounted = true;
    const { locale } = this.props;
    let data = await getRessources("demonstration","demonstration_model", locale);

    this.setState({
      showroom: data
    });
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  handlerChangeModel = (event) => {

    //console.log("handlerChangeModel : ",event);
    //console.log("model selectionné : ",this.state.showroom[event.target.value].model_url);
    if(event.target.value !== "default"){
      this.setState({
        model_seleted:this.state.showroom[event.target.value].model_url,
        model_image:this.state.showroom[event.target.value].url,
        image_alt:this.state.showroom[event.target.value].alt,
        
      })
    }
    this.setState({
      chose_image:event.target.value
    })
   
  }


  render() {
    return (
      <div className="">
{this.state.showroom.length > 0 && 
<div>
<div className="show-title">
  <h2 className="show-title-text">{this.state.showroom[0].title}</h2>
  </div>
  <div className="pt-5">
                <div className="container">
                  <h5>{this.state.showroom[0].subtitle}</h5>
                </div>
                <div className="pt-5 pb-5 container descrption-show">
                  <p>{this.state.showroom[0].description}</p>
                </div>

</div>
</div>}
      <div className="form-group">
         
          <select className="form-control container" id="exampleFormControlSelect1" onChange={this.handlerChangeModel}>
            <option value="default" >Charger un model 3D </option>
            {this.state.showroom.length > 0 ? 
            this.state.showroom.map((model, index) => 
              <option key={index} value={index} >{model.model_alt}</option>
            )
          :""}
          </select>
        </div>
        {this.state.chose_image === "default" ? <div>Sélectionner un model 3D à charger </div> :
       <div>
       <div className="pt-5 pb-5 container ">
          <iframe title="A 3D model" className="md-show"  src={this.state.model_seleted}  ></iframe>
        </div>
        <div className="pt-5 container">
          <img className="img-show" src={this.state.model_image} alt={this.state.image_alt} />
        </div>
        </div>}
      
      </div>
    );
  }
}



export default DemoModel;



