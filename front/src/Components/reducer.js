import { 
  GET_NAME_SOLUTION_SELECTED,
  GET_ARRAY_NAME_SOLUTION,
  GET_NUM_LANG,
  GET_ID_LANG,
  GET_SOLUTIONS
  } from "./actionTypes";

const STORE = {
  linkSolution: "",
  solutionSelected:"",
  array_name_solution:[],
  num_lang:[],
  idLang:"",
  solutions:[]

};

const rootReducer = (state = STORE, action) => {

  switch (action.type) {
    
    case GET_NAME_SOLUTION_SELECTED.type:
        STORE.solutionSelected = action.name_solution;
        STORE.linkSolution = action.link_solution;
        return state;

    case GET_ARRAY_NAME_SOLUTION.type:
      STORE.array_name_solution = action.section_filtered;
      return state;

    case GET_NUM_LANG.type:
      STORE.num_lang = action.num_lang;
      return state;

    case GET_ID_LANG.type:
    
      STORE.idLang = action.idLang;
      return state;

    case GET_SOLUTIONS.type:
      console.log(action.objet);
      STORE.solutions = action.objet;
      return state;

    default:
      break;
  }
 
  return state

};


export default rootReducer;