import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';
import HashTutorial from '../src/Components/HashTutorial/HashTutorial';
import Resolvve from '../src/Components/Resolvve/Resolvve';
import Home from '../src/Components/Home/Home';
import NavigationBar from '../src/Components/NavigationBar/NavigationBar';
import firebase from './firebaseConfig';
import { Route, Switch } from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentArrHome: [],
      contentArrResolvve: [],
      contentArrHash: []
    }
    this.db = firebase.firestore();
  }

  /**
   * Potential ToDos:
   *  - Consider adding external github link in navbar
   */

  componentDidMount() {
    this.getContentHome();
    this.getContentResolvve();
    this.getContentHash();
  }

  getContentHome() {
    this.db.collection('contentHome').orderBy("order", "asc").get()
    .then(snaps => {
      let localContent = [...this.state.contentArrHome];
      if (snaps.empty) {return} //guard clause
      snaps.forEach(doc => {
        let data = doc.data();
        data = {...data, id: doc.id};
        localContent.push(data);
      })
      this.setState({contentArrHome: localContent});
    })
    .catch(err => {console.log(err)});
  }

  getContentResolvve() {
    this.db.collection('contentResolvve').orderBy("order", "asc").get()
    .then(snaps => {
      let localContent = [...this.state.contentArrResolvve];
      if (snaps.empty) {return} //guard clause
      snaps.forEach(doc => {
        let data = doc.data();
        data = {...data, id: doc.id};
        localContent.push(data);
      })
      this.setState({contentArrResolvve: localContent});
    })
    .catch(err => {console.log(err)});
  }

  getContentHash() {
    this.db.collection('content_Hash').orderBy("order", "asc").get()
    .then(snaps => {
      let localContent = [...this.state.contentArrHash];
      if (snaps.empty) {return} //guard clause
      snaps.forEach(doc => {
        let data = doc.data();
        data = {...data, id: doc.id};
        localContent.push(data);
      })
      this.setState({contentArrHash: localContent});
    })
    .catch(err => {console.log(err)});
  }

  render() {
      return (
        <div className="App">
          <div className="NavWrapper">
          <NavigationBar/>
          </div>
          <Switch>                 
             <Route path='/Hash' render={() => <HashTutorial content={this.state.contentArrHash} />}/>               
             <Route path='/Resolvve' render={() => <Resolvve content={this.state.contentArrResolvve} />}/>  
             <Route path='/' render={() => <Home content={this.state.contentArrHome} />}/>             
          </Switch>
        </div>
      );
    }
  }
export default App;
