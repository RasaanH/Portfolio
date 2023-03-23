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
        lockedNumber: 0,
        lockedScale: "none"
      }
      this.scales = ['A','Ab', 'B', 'Bb', 'C', 'C#', 'D', 'E', 'Eb', 'F', 'F#', 'G'];
      this.numbers = [1,2,3,4,5,6,7];
      this.change = this.change.bind(this); //Fixes context of 'this'
      this.searchName = this.searchName.bind(this);
    }

    change(event) {
      const {name, value, type, checked} = event.target // type and checked for if we ever add checkbox
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
              <NoteInScaleWindow 
                notes={this.scales} 
                milliseconds={milliseconds} 
                running={this.state.running} 
                numbers={this.numbers} 
                lockedNumber={this.state.lockedNumber}
                lockedScale={this.state.lockedScale}
              />
            </div>
          </div>
        <div>
        <Form>
            <Form.Group style={{textAlign: "left"}}>
              <Form.Label style={{fontWeight: 500}}>Set BPM</Form.Label>
              <Form.Control onChange={this.change} name="bpmField" value={this.state.bpmField} min="30" max="180" type="number" placeholder="BPM" />
              <Form.Label style={{fontWeight: 500}}>Lock Number</Form.Label>
              <Form.Control as="select" onChange={this.change} name="lockedNumber" value={this.state.lockedNumber} type="select">
                <option value={0}>None</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
                <option value={6}>6</option>
                <option value={7}>7</option>
              </Form.Control> 
              <Form.Label style={{fontWeight: 500}}>Lock Scale</Form.Label>
              <Form.Control as="select" onChange={this.change} name="lockedScale" value={this.state.lockedScale} type="select">
                <option value={"none"}>None</option>
                <option value={"C"}>C</option>
                <option value={"C#"}>C#</option>
                <option value={"D"}>D</option>
                <option value={"Eb"}>Eb</option>
                <option value={"E"}>E</option>
                <option value={"F"}>F</option>
                <option value={"F#"}>F#</option>
                <option value={"G"}>G</option>
                <option value={"Ab"}>Ab</option>
                <option value={"A"}>A</option>
                <option value={"Bb"}>Bb</option>
                <option value={"B"}>B</option>
              </Form.Control> 
            </Form.Group>
            {/* <Form.Group style={{textAlign: "left"}}> */}
              {/* <Form.Select onChange={this.change} name="lockedNumber" value={this.state.lockedNumber} type="select">
                <option value={0}>none</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
              </Form.Select> */}
            {/* </Form.Group> */}
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
