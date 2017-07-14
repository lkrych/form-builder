import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './assets/react-toolbox/theme.css';
import theme from './assets/react-toolbox/theme.js';
import ThemeProvider from 'react-toolbox/lib/ThemeProvider';

import TabView from './components/tab-view';

// TabView handles creating, editing and saving the form state. The form state is created in
// the form-builder, the form is itself created in the form-viewer, and it is converted into
// exportable JSON with the export componenet

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>Indio React Challenge</h2>
          </div>

          <TabView/>

        </div>
      </ThemeProvider>
    );
  }
}

export default App;
