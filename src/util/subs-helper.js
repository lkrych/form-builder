export const removeSubInput = (state, id) => {
  Object.keys(state).forEach(key => {
    if(state[key]['subInputs'].length > 0){
      depthFirstDeletion(state[key]['subInputs'], id);
    }
  });
};

export const updateSubInput = (state, id, name, value) => {
  Object.keys(state).forEach(key => {
    if(state[key]['subInputs'].length > 0){
      depthFirstUpdate(state[key]['subInputs'], id, name, value);
    }
  });
};

export const addNestedSubInput = (state, parentId, newInput) => {
  Object.keys(state).forEach(key => {
    if(state[key]['subInputs'].length > 0){
      depthFirstAddSubInput(state[key]['subInputs'], parentId, newInput);
    }
  });
};

const depthFirstDeletion = (subInputsArray, objectId) => {
  if(subInputsArray.length === 0){
    return;
  }
  subInputsArray.forEach((subItem, idx) => {
    let key = Object.keys(subItem)[0];
    if(key === objectId){
      subInputsArray.splice(idx, 1);
    } else{
      depthFirstDeletion(subItem[key]['subInputs'], objectId);
    }
  });
};

const depthFirstUpdate = (subInputsArray, objectId, name, value) => {
  if(subInputsArray.length === 0){
    return;
  }
  subInputsArray.forEach((subItem, idx) => {
    let key = Object.keys(subItem)[0];
    if(key === objectId){
      subItem[key][name] = value;
    } else{
      depthFirstUpdate(subItem[key]['subInputs'], objectId, name, value);
    }
  });
};

const depthFirstAddSubInput = (subInputsArray, parentId, newInput) => {
  if(subInputsArray.length === 0){
    return;
  }
  subInputsArray.forEach((subItem, idx) => {
    let key = Object.keys(subItem)[0];
    if(key === parentId){
        subItem[key].subInputs.push(newInput);
    } else{
      depthFirstAddSubInput(subItem[key]['subInputs'], parentId, newInput);
    }
  });
};
