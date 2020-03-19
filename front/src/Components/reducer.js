import { GET_LINK_SOLUTION } from "./actionTypes";
import { GET_NAME_SOLUTION_SELECTED } from "./actionTypes";

const STORE = {
  linkSolution: "",
  solutionSelected:""
};

const rootReducer = (state = STORE, action) => {

  switch (action.type) {
    
    case GET_NAME_SOLUTION_SELECTED.type:
        STORE.solutionSelected = action.name_solution;
        STORE.linkSolution = action.link_solution;
        return state;
 
    default:
      break;
  }
  console.log("STORE", STORE);
  return state

};


export default rootReducer;