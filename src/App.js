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
      contentArr: []
    }
    this.db = firebase.firestore();
  }

  /**
   * Potential ToDos:
   *  - Consider adding external github link in navbar
   */

  componentDidMount() {
    this.db.collection('contentHome').get()
    .then(snaps => {
      let localContent = [...this.state.contentArr];
      if (snaps.empty) {return} //guard clause
      console.log(snaps);
      snaps.forEach(doc => {
        let data = doc.data();
        data = {...data, id: doc.id};
        localContent.push(data);
        //console.log(data);
      })
      this.setState({contentArr: localContent});
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
             <Route path='/Hash' component={HashTutorial}/>               
             <Route path='/Resolvve' component={Resolvve}/>  
             <Route path='/' render={() => <Home content={this.state.contentArr} />}/>             
          </Switch>
        </div>
      );
    }
  }
export default App;
