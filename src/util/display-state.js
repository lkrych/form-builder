
export const displayState = (state) => {
  let stateMap = [];
  Object.keys(state).forEach(key => {
    stateMap.push(state[key]);
    if(state[key]['subInputs'].length > 0){
      stateMap = stateMap.concat(depthFirst(state[key]['subInputs']));
    }
  });
  return stateMap;
};

//helper function for returning all sub-questions
const depthFirst = (subInputsArray) => {
  if(subInputsArray.length === 1){
    return subInputsArray[0];
  }
  let subInputs = [];
  subInputsArray.forEach(subItem => {
    let key = Object.keys(subItem)[0];
    subInputs.push(subItem);
    let searchResults = depthFirst(subItem[key]['subInputs']);
    subInputs = subInputs.concat(searchResults);
  });
  return subInputs;
};
