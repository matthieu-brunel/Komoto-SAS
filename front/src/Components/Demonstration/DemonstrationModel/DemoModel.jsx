import React, { Component } from 'react';
import './DemoModel.css';
import getRessources from "../../../utils/getRessources";
import { UncontrolledButtonDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap';
import { Button } from 'reactstrap';

class DemoModel extends Component {
  constructor() {
    super();
    this.state = {
      showroom: []
    };
  }
  componentDidMount = async () => {
    let data = await getRessources("demonstration");

    this.setState({
      showroom: data
    });
  };
  render() {
    return (
      <div className="">
        {this.state.showroom.length > 0 && <div className="show-title"><h2 className="show-title-text">{this.state.showroom[0].title}</h2></div>}
        {this.state.showroom.map((showroom, index) => {
          return (
            <div key={index}>

              <div className="pt-5">
                <div className="container">
                  <h5>{showroom.subtitle}</h5>
                </div>
                <div className="pt-5 pb-5 container descrption-show">
                  <p>{showroom.description}</p>
                </div>
                <div className="d-flex container pt-3 pb-5">
                  <div className="w-50">
                    <UncontrolledButtonDropdown>
                      <DropdownToggle className="drop" caret color="secondary">
                      Sélectionner un model 3d
                     </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem >model 1</DropdownItem>
                        <DropdownItem >model 2</DropdownItem>
                        <DropdownItem>model 3 </DropdownItem>
                        <DropdownItem>model 4</DropdownItem>
                      </DropdownMenu>
                    </UncontrolledButtonDropdown>
                  </div>
                  <div className="w-50">
                  <Button color="secondary">secondary</Button>
                  </div>
                </div>
                <div className="pt-5 pb-5 container ">
                  <img className="img-show" src={showroom.model_url} alt={showroom.alt} />
                </div>
                <div className="pt-5 container">
                  <img className="img-show" src={showroom.url} alt={showroom.alt} />
                </div>

              </div>
            </div>
          );
        })}
      </div>
    );
  }
}



export default DemoModel;