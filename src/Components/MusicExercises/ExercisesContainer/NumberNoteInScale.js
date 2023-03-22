import React, { Component } from 'react';
import classes from './NumberNoteInScale.module.css';
import {Form, Button} from 'react-bootstrap';
import { NoteInScaleWindow } from './NoteInScaleWindow';
import { transformBPMToMS } from "../../../Utils/transformBPMToMS";

class NumberNoteInScale extends Component {
    constructor(props) {
      super(props);
      this.state = {
        bpmField: 25,
        bpm: 25,
        running: false,
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

    setNewBPM() {
      if (this.state.bpmField >= 5 && this.state.bpmField <= 180) {
        this.setState({
          bpm: this.state.bpmField
        });
        return;
      };
      this.setState({
        bpmField: this.state.bpm
      });
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
              <Form.Control onChange={this.change} name="bpmField" value={this.state.bpmField} min="30" max="180" type="number" placeholder="BPM" />
            </Form.Group>
            <Button 
              bsPrefix={`${classes.customButton} btn`} 
              disabled={false} 
              onClick={(e) => {e.preventDefault(); this.setNewBPM();}} 
              type='submit' 
              variant="success">
              Update BPM
            </Button>
          </Form>
            <Button 
              bsPrefix={`${classes.customButton} btn`} 
              style={{marginTop: '10px'}}
              disabled={false} 
              onClick={(e) => { e.preventDefault(); this.toggleRunning(); this.setNewBPM()}} 
              type='submit' 
              variant="success">
              {!this.state.running ? 'Start' : 'Stop'}
            </Button>
        </div>
      </div>
      );
    }
  }
  
  export default NumberNoteInScale;
