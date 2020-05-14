import React, { Component } from 'react';


class DisplaySectionEdit extends Component{



    
    render(){

        let arrayDescription = [];

      
        for(let solution of this.props.description){
            arrayDescription.push(solution[0]);
        }

        console.log(arrayDescription)
            
        return(
            <div>
                {
                    arrayDescription.length > 0
                    &&
                    arrayDescription.map(solution => (
                        <div>
                            <h3>{solution.title}</h3>
                            <ul>
                                {
                                    solution.description.map((description, index) => (
                                        <li key={index}>{description}</li>
                                    ))
                                }
                            </ul>
                        </div>
                    ))
                    
                }
            </div>
        )
    }
}


export default DisplaySectionEdit;