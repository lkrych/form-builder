import React, { Component} from 'react';
import NumberInput from '../components/form-input/number';
import TextInput from '../components/form-input/text';
import RadioButtons from '../components/form-input/radio';

const makeComponent = (item, key, idx) => {
  let componentHash = {
    "text": <div key = {idx}>
              <p>{item[key].questionText}</p>
              <TextInput
                subInputs = {item[key].subInputs} />
            </div>,
    "number": <div key = {idx}>
                <p>{item[key].questionText}</p>
                <NumberInput
                  subInputs = {item[key].subInputs} />
              </div> ,
    "radio": <div key = {idx}>
                <p>{item[key].questionText}</p>
                <RadioButtons
                  subInputs = {item[key].subInputs} />
              </div>
  };

  return componentHash[item[key].questionType];
};

export const displayConditional = (questionType, value, subInputs) => {
  const subQuestions = [];
  if(questionType === "radio"){
    subInputs.forEach((item,idx) => {
      let key = Object.keys(item)[0];
      if (item[key]['conditionText'] === value){
        subQuestions.push(makeComponent(item, key, idx));
      }
    });
  } else if (questionType === "number") {
    subInputs.forEach((item,idx) => {
      let key = Object.keys(item)[0];
      let condition = item[key]['condition'];
      let conditionValue = parseInt(item[key]['conditionText']);
      if (condition === "equals"){
        if(conditionValue === parseInt(value)){
          subQuestions.push(makeComponent(item, key, idx));
        }
      } else if(condition === "greater than"){
        if(conditionValue < parseInt(value)){
          subQuestions.push(makeComponent(item, key, idx));
        }
      } else if((condition === "less than")){
          if(conditionValue > parseInt(value)){
          subQuestions.push(makeComponent(item, key, idx));
        }
      }
    });
  } else{
    subInputs.forEach((item,idx) => {
      let key = Object.keys(item)[0];
      if (item[key]['conditionText'].toLowerCase() === value.toLowerCase()){
        subQuestions.push(makeComponent(item, key, idx));
      }
    });
  }
  return subQuestions;
};
