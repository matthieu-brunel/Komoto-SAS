import React, { Component} from 'react';
import './Reference.css';
import ReferenceComponents from './ReferenceComponents/ReferenceComponents';
import Footer from '../Footer/Footer';
import getRessources from "./../../utils/getRessources";



class Reference extends Component {
  constructor(props){
    super(props);
    this.state = {
      reference:[]
    }
  }

  componentDidMount = async () => {
    const { locale } = this.props;
    let data = await getRessources("reference", "reference", locale);
    let arrayReference = [];
    for(let obj of data){
      let url = JSON.parse(obj.url);
      let description = JSON.parse(obj.description);
      obj.url = url;
      obj.description = description;
      arrayReference.push(obj);
    }
    
    this.setState({reference:arrayReference});
  };



  

  render(){

    return (
      <div className="">
       { <ReferenceComponents reference={this.state.reference}/>}
        <Footer />
      </div>
    );
  }

}

export default Reference;