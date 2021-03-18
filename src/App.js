import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';
import HashTutorial from '../src/Components/HashTutorial/HashTutorial';
import Resolvve from '../src/Components/Resolvve/Resolvve';
import Home from '../src/Components/Home/Home';
import { Route, Switch } from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
      return (
        <div className="App">
          <Switch>                 
             <Route path='/Hash' component={HashTutorial}/>               
             <Route path='/Resolvve' component={Resolvve}/>  
             <Route path='/' component={Home}/>            
          </Switch>
        </div>
      );
    }
  }
export default App;
