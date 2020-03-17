import React, { Component } from 'react';
import './SolutionTextkroco.css';



class SolutionText extends Component {
  constructor(props){
    super(props);
    this.state = {
      texte:[]
    }
  }

  componentDidMount(){
    this.filtrageText();
  }

  filtrageText = () => {
    const { texte } = this.props;
    let array_texte = [];

    for(let i = 0; i < texte.length; i++){
      if(texte.subtitle != 'header'){
        array_texte.push(texte[i])
      }
    }
    
    console.log(texte);

  }
  render(){
    const { texte } = this.props;
    return (
        <div className="container container-solution-kroco text-left">
        {texte.map((element, index) => (
          <div className="div-solution-kroco mb-5" key={index}>
            <div className="div-title-solution-kroco"><h3 className="title-solution-kroco">{element.subtitle !== 'header' ? element.title : ""}</h3></div>
            <div className="div-texte-solution-kroco">
            <ul>
              {element.subtitle !== 'header' ? element.description.map((description, index) => (
                <li key={index}>{description}</li>
              )) 
              : ""}
              </ul></div>
          </div>
        ))}
        </div>

    );
  }

}

export default SolutionText;