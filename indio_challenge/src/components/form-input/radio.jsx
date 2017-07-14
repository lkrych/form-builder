import React, { Component } from 'react';
import RadioGroup from 'react-toolbox/lib/radio/RadioGroup';
import RadioButton from 'react-toolbox/lib/radio/RadioButton';

import {displayConditional} from '../../util/form-creator-helper';


class RadioButtons extends Component {
  constructor(props){
    super(props);
    this.state = {
      value: 'yes'
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value){
    this.setState({value});
  }

  render(){
    const subQuestions = displayConditional("radio", this.state.value, this.props.subInputs);
    return (
      <div className = "form-component-container">
        <div className="form-component-main">
          <RadioGroup name='binary' value={this.state.value} onChange={this.handleChange} className ="radio-group">
            <RadioButton label='yes' value='yes'/>
            <RadioButton label='no' value='no' className="no-radio-button"/>
          </RadioGroup>
        </div>
        <div className = 'form-component-sub'>
          {subQuestions}
        </div>
      </div>
    );
  }
}

export default RadioButtons;
