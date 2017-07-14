import React, { Component } from 'react';

import NumberInput from './form-input/number';
import TextInput from './form-input/text';
import RadioButtons from './form-input/radio';

class FormCreator extends Component {
  constructor(props){
    super(props);
    this.state = {

    };
  }

  render(){
    var stateElements = Object.keys(this.props.form).map(key => this.props.form[key]);
    var formElements = stateElements.map((element, idx) => {
      if(element.questionType === 'radio'){
        return(
          <div key = {idx}>
            <p>{element.questionText}</p>
            <RadioButtons
              subInputs = {element.subInputs} />
          </div>
        );
      } else if (element.questionType === 'number'){
        return(
          <div key = {idx}>
            <p>{element.questionText}</p>
            <NumberInput
              subInputs = {element.subInputs} />
          </div>
        );
      } else {
          return(
            <div key = {idx}>
              <p>{element.questionText}</p>
              <TextInput
                subInputs = {element.subInputs} />
            </div>
          );
      }
    });

    return(
      <div>
        <form className="output-form">
          {formElements}
        </form>
      </div>


    );
  }
}

export default FormCreator;
