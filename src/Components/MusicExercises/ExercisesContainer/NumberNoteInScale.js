import React, { Component } from 'react';
import classes from './NumberNoteInScale.module.css';
import {Form, Button} from 'react-bootstrap';
import { NoteInScaleWindow } from './NoteInScaleWindow';
import { transformBPMToMS } from "../../../Utils/transformBPMToMS";

class HashLogic extends Component {
    constructor(props) {
      super(props);
      this.state = {
        bpm: 25,
        running: false,
        holdingArray: new Array(23),
        numItems: 0,
        keys: [],
        nameSearch: "",
        nameAdd: "",
        favoriteFoodAdd: "",
        searchResult: ""
      }
      this.scales = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
      this.change = this.change.bind(this); //Fixes context of 'this'
      this.searchName = this.searchName.bind(this);
    }

    change(event) {
      const {name, value, type, checked} = event.target // type and checked for if we ever add checkbox
      //console.log('in onchange', name, value)
      if (value.length > 42) {
        return;
      }
        this.setState({[name]: value});
    }

    toggleRunning() {
      this.setState({running: !this.state.running})
    }

    searchName(key) {
      //console.log("key", key);
      let favFood = this.retrieveItem(key);
      this.setState({
        searchResult: favFood,
        nameSearch: ""
      })
    }

    addName(key, value) {
      this.addItem(key, value);
      this.setState({
        nameAdd: "",
        favoriteFoodAdd: ""
      })
    }

    componentDidUpdate(prevProps, prevState) {
      if (prevState.numItems !== this.state.numItems) {
        let loadFactor = this.state.numItems / this.state.holdingArray.length;
        if (loadFactor > 0.7) {this.reHash()};
      }
    }

    async componentDidMount() {
      console.log('mounted')
    }

    render() {
      const milliseconds = transformBPMToMS(this.state.bpm);
      return (
        <div className={classes.umbrella}>
          <div className={classes.hashGroup}>
            <div className={classes.container}>
              <NoteInScaleWindow notes={this.scales} milliseconds={milliseconds} running={this.state.running} />
            </div>
          </div>
        <div>
        <Form>
            <Form.Group style={{textAlign: "left"}}>
              <Form.Label style={{fontWeight: 500}}>Set BPM</Form.Label>
              <Form.Control onChange={this.change} name="bpm" value={this.state.bpm} min="30" max="180" type="number" placeholder="BPM" />
            </Form.Group>
            <Button 
              bsPrefix={`${classes.customButton} btn`} 
              disabled={false} 
              onClick={(e) => {e.preventDefault(); console.log('clicked');}} 
              type='submit' 
              variant="success">
              Update BPM
            </Button>
          </Form>
            <Button 
              bsPrefix={`${classes.customButton} btn`} 
              disabled={false} 
              onClick={(e) => { e.preventDefault(); this.toggleRunning();}} 
              type='submit' 
              variant="success">
              {!this.state.running ? 'Start' : 'Stop'}
            </Button>
        </div>
      </div>
      );
    }
  }
  
  export default HashLogic;
