import React, { Component } from 'react';
import {Tab, Tabs} from 'react-toolbox/lib/tabs';
import merge from 'lodash/merge';



import FormCreator from './form-creator';
import FormBuilder from './form-builder';
import { removeSubInput, updateSubInput, addNestedSubInput } from '../util/subs-helper';
const uuidv1 = require('uuid/v1');

//in order to pass state across tabs, the logic for modifying the state needs
// to be passed down into the formBuilder from TabViewer

class TabView extends Component {
  constructor(props){
    super(props);
    this.state = {
      tabIndex: 0,
      form: JSON.parse(localStorage.getItem('indioForm') || '{}'), // Either retrieve the JSON or create an empty array
      //localStorage info: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
      // subInputs: {}
      };
    this.handleTabChange = this.handleTabChange.bind(this);
    this.addInput = this.addInput.bind(this);
    this.removeInput = this.removeInput.bind(this);
    this.addSubInput = this.addSubInput.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  componentDidUpdate(){
    localStorage.setItem('indioForm', JSON.stringify(this.state.form));
  }

  handleTabChange(tabIndex){
    this.setState({tabIndex});
  }

  //allows questions to be added to form state
  addInput(){
    let inputId = uuidv1();
    var newInput = {};
    newInput[inputId] = {questionText: '', questionType: '', subInputs: []};
    this.setState({
      form: merge({}, this.state.form, newInput)
    });
  }

  //allows questions to be deleted
  removeInput(questionId){
    const newForm = this.state.form;
    if(this.state.form[questionId]){ //if key is in outermost object
      delete newForm[questionId];
      this.setState({
        form: newForm
      });
    } else {
      removeSubInput(newForm, questionId);
      this.setState({
        form: newForm
      });
    }

  }
  //allows questions to be nested
  addSubInput(parentId){
    let inputId = uuidv1();
    var newInput = {};
    newInput[inputId] = {condition: '', conditionText: '',
                        questionText: '', questionType: '', subInputs: []};
    var newForm = this.state.form;
    if(newForm[parentId]){
      var parent = newForm[parentId];
      parent.subInputs.push(newInput);
      //update form state
      this.setState({
        form: newForm
      });
    } else{
      addNestedSubInput(newForm, parentId, newInput);
      this.setState({
        form: newForm
      });
    }
  }

  //can be called on each individual field that can be edited
  onInputChange(questionId, name, value){
    const newForm = this.state.form;
    if(this.state.form[questionId]){
      newForm[questionId][name] = value;
      this.setState({
        form: newForm
      });
    } else {
      updateSubInput(newForm, questionId, name, value);
      this.setState({
        form: newForm
      });
    }
  }


  render() {
    return (
     <section>
       <Tabs index={this.state.tabIndex} onChange={this.handleTabChange} inverse>
         <Tab label='Create'>
           <h2>Welcome to the Indio Form Generator</h2>
           <p> Select a question type and create your form. You can preview your form in
           the <b>Preview</b> tab, and export your form data as JSON in the <b>Export</b> tab.</p>
           <FormBuilder
              form = {this.state.form}
              addInput = {this.addInput}
              removeInput = {this.removeInput}
              addSubInput = {this.addSubInput}
              onInputChange = {this.onInputChange}
                   />
         </Tab>
         <Tab label='Preview'>
           <h2>Your form</h2>
           <p>Click on <b>Create</b> to revise your form.</p>
           <FormCreator
             form= {this.state.form}
             />

          </Tab>
         <Tab label='Export'>
           <h2>Your data</h2>
           <div className="export-json-container">
             <textarea  rows="35" cols="30"
               className = "export-json"
               defaultValue = { JSON.stringify(this.state.form, undefined, 2)} >
             </textarea>
           </div>
         </Tab>
       </Tabs>
     </section>
   );
  }
}

export default TabView; // Don’t forget to use export default!
