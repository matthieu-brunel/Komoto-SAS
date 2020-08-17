import React, { Component } from 'react';


import {
  GridContextProvider,
  GridDropZone,
  GridItem,
  swap
} from "react-grid-dnd";
 
function DragNDrop(props) {
  
 
  return (
    <GridContextProvider onChange={props.onChange}>
      <GridDropZone
        id="items"
        boxesPerRow={1}
        rowHeight={50}
        style={{ height: "400px" }}
      >
        {props.list.map((item, index) => (
          <GridItem key={index}>
            <div style={{width: "100%",height: "100%",textAlign:"center"}}>
              {item}{"   "}
              <button type="button" onClick={props.deleteDescription.bind(this, index)}>x</button>
            </div>
          </GridItem>
        ))}
      </GridDropZone>
    </GridContextProvider>
  );
} 


export default DragNDrop;


/* {
    this.state.arrayDescription.length > 0 && this.state.arrayDescription.map((element, index) => (
    <li key={index}>{element}</li>
    ))
} */