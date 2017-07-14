import React, { Component } from 'react';
import Dropdown from 'react-toolbox/lib/dropdown';
import Input from 'react-toolbox/lib/input';
import Button from 'react-toolbox/lib/button/Button';

import SubInputGroup from './sub-input-group';

//InputGroup will manage the state of individual components of the form.

class InputGroup extends Component {
  constructor(props){
    super(props);
    this.state = {
        questionType: 'none',
        questionText: 'Your new question'
      };
    this.questionTypes = [
    { value: 'text', label: "Text" },
    { value: 'number', label: 'Number' },
    { value: 'radio', label: 'Yes/No' }
      ];
    this.removeInput = this.removeInput.bind(this);
  }

  onInputChange(name, value){
    this.props.onInputChange(this.props.questionKey, name, value);
  }

  removeInput(questionId){
    this.props.removeInput(questionId);
  }

  addSubInput(questionId){
    this.props.addSubInput(questionId);
  }

  render() {
    //subInput is a SubInput Item
    const subQuestions = this.props.subInputs.map(subInput => {
      let key = Object.keys(subInput)[0];
        return(
          <SubInputGroup
              key = {key}
              questionKey = {key}
              condition = {subInput[key]['condition']}
              conditionText = {subInput[key]['conditionText']}
              parentQuestionType = {this.props.questionType}
              questionType = {subInput[key]['questionType']}
              questionText = {subInput[key]['questionText']}
              subInputs = {subInput[key]['subInputs']}
              removeInput = {this.props.removeInput}
              addSubInput = {this.props.addSubInput}
              onInputChange = {this.props.onInputChange}
              />
        );
      });
    return (
      <div>
        <div className = "question-container">
          <Input type='text' label='Question' name='questionText' value={this.props.questionText} onChange={this.onInputChange.bind(this, 'questionText')}  />
          <Dropdown
            auto={false}
            source={this.questionTypes}
            onChange={this.onInputChange.bind(this, 'questionType')}
            label='Select question type'
            value={this.props.questionType}
            required
          />
        <div className="question-buttons">
          <Button label="Add Sub-Question" onClick = {() => this.addSubInput(this.props.questionKey)} className="" raised primary />
          <span className="button-span"></span>
          <Button label="Delete this question" onClick = {() => this.removeInput(this.props.questionKey)} className="delete-button" raised primary />
        </div>

        <div className ='sub-questions'>
          {subQuestions}
        </div>

      </div>

    </div>
   );
  }
}

export default InputGroup; // Don’t forget to use export default!
