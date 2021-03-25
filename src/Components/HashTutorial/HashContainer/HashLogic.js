import React, { Component } from 'react';
import HashSquare from './HashSquare';
import classes from './HashLogic.module.css';
import {Form, Button} from 'react-bootstrap'

class HashLogic extends Component {
    constructor(props) {
      super(props);
      this.state = {
        holdingArray: new Array(23),
        numItems: 0,
        keys: [],
        nameSearch: "",
        nameAdd: "",
        favoriteFoodAdd: "",
        searchResult: ""
      }
      this.change = this.change.bind(this); //Fixes context of 'this'
      this.searchName = this.searchName.bind(this);
    }

    change(event) {
      const {name, value, type, checked} = event.target //type and checked for if we ever add checkbox
      //console.log('in onchange', name, value)
      if (value.length < 42) { //42 character limit on fields
        this.setState({[name]: value});
      }
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
      // await this.addItem("Maddie", "Salad");
      // await this.addItem("Jane", "Cookies");
      // await this.addItem("James", "Pizza");
      // await this.addItem("Tim", "Soup");
      this.autoDelayEntry();
    }

    async autoDelayEntry() {
      //allows user to run simulation of many key values being added
      //  await this.addItem("Jim", "Pizza")
      //  await this.addItem("Adam", "Salad")
      //  await this.addItem("Sarah", "Ice Cream")
      //  await this.addItem("Bob", "Raisin Bran")
      //  await this.addItem("Bill", "Bananas")
      //  await this.addItem("Aria", "Apples")
      //  await this.addItem("Bernie", "Strawberries")
      //  await this.addItem("Donald", "Mangos")
      //  await this.addItem("Tim", "Oranges")
      //  await this.addItem("Tammy", "Lemons")
      //  await this.addItem("Barry", "Limes")
      //  await this.addItem("Dan", "Brussel Sprouts")
      //  await this.addItem("Leo", "Burgers")
      //  await this.addItem("Carter", "Chilli")
      //  await this.addItem("Alex", "Chicken")
      //  await this.addItem("Virgil", "Fish")
      //  await this.addItem("Lorenzo", "Ranch Dressing")
      //  await this.addItem("Christina", "Spicy Chicken")
      //  await this.addItem("Rasaan", "Alfredo Pasta")
      //  await this.addItem("Lisa", "Chinese Food")
      //  await this.addItem("Daniel", "Brocolli")
      //  await this.addItem("Fred", "Tacos")
      //  await this.addItem("Chris", "Oatmeal")
      
      setTimeout(() => {this.addItem("Jim", "Pizza")}, 250)
      setTimeout(() => {this.addItem("Adam", "Salad")}, 500)
      setTimeout(() => {this.addItem("Sarah", "Ice Cream")}, 750)
      setTimeout(() => {this.addItem("Bob", "Raisin Bran")}, 1000)
      setTimeout(() => {this.addItem("Bill", "Bananas")}, 1250)
      setTimeout(() => {this.addItem("Aria", "Apples")}, 1500)
      setTimeout(() => {this.addItem("Bernie", "Strawberries")}, 1750)
      setTimeout(() => {this.addItem("Donald", "Oranges")}, 2000)
      setTimeout(() => {this.addItem("Tim", "Mangos")}, 2250)
      setTimeout(() => {this.addItem("Tammy", "Lemons")}, 2509)
      setTimeout(() => {this.addItem("Barry", "Limes")}, 2750)
      setTimeout(() => {this.addItem("Dan", "Brussel Sprouts")}, 3000)
      setTimeout(() => {this.addItem("Leo", "Burgers")}, 3250)
      setTimeout(() => {this.addItem("Carter", "Chilli")}, 3500)
      setTimeout(() => {this.addItem("Alex", "Chicken")}, 3750)
      setTimeout(() => {this.addItem("Virgil", "Fish")}, 4000)
      setTimeout(() => {this.addItem("Lorenzo", "Ranch Dressing")}, 4250)
      setTimeout(() => {this.addItem("Christina", "Spicy Chicken")}, 4500)
      setTimeout(() => {this.addItem("Rasaan", "Alfredo Pasta")}, 4750)
      setTimeout(() => {this.addItem("Lisa", "Chinese Food")}, 5000)
      setTimeout(() => {this.addItem("Chris", "Oatmeal")}, 5250)
      setTimeout(() => {this.addItem("Daniel", "Brocolli")}, 5500)
      setTimeout(() => {this.addItem("Fred", "Tacos")}, 5750)
    }

    retrieveItem (key) {
      key = key.trim().toLowerCase();
      let index = this.hashFunction(key);
      let item = this.state.holdingArray[index];
      if (!Array.isArray(item)) {
        return "No value found"
      };
      let returnValue;
      for (let i = 0; i<item.length && !returnValue; i++) {
        if (item[i][0].toLowerCase() === key) {returnValue = item[i][1]};
      }
      return returnValue ? `${index} ${returnValue}` : "No value found";
    }

    addItem(key, value) {
      key = key.trim().toLowerCase(); //storing and searching lowercase
      return new Promise((resolve, reject) => {
      let index = this.hashFunction(key);
      let linkedItem = [key, value];
      let localArr = [...this.state.holdingArray];
      let localKeys= [...this.state.keys];
      let beginNumItems = this.state.numItems;

      if (!localArr[index]) { //if nothing is in this index, add the item
        localArr[index] = [linkedItem]
        localKeys.push(key);
        this.setState({
          numItems: beginNumItems + 1,
          holdingArray: localArr,
          keys: localKeys
        })
        resolve(index);
        return
      }
      let existingIndex = localArr[index].findIndex(item => item[0] === key)
      //console.log("existingIndex", existingIndex);
      if (typeof existingIndex === 'number' && existingIndex !== -1) { //if this key is already in this index's linked list somewhere, update it
        localArr[index][existingIndex] = linkedItem;
        this.setState({
          holdingArray: localArr
        })
        resolve(index);
        return
      }
      //implied else, if there is an array at this index but this key isn't in it, push this item onto the index
      localArr[index].push(linkedItem);
      localKeys.push(key);
      this.setState({
        numItems: beginNumItems + 1,
        holdingArray: localArr,
        keys: localKeys
      })
      resolve(index);

      })
    }

    hashFunction (key, newSize) {
      /**
       * This function returns a seemingly random but consistent and 
       * predictable index for a given key to be stored in the hash table.
       */
      //console.log("key", key)
      if (typeof key !== 'string') {alert("key must be a string"); return} //guard clause
      let hash = 7; //prime
      let length = newSize || this.state.holdingArray.length;
      let arrKey = [...key];
      arrKey.forEach((letter, index) => {
        hash *= 13*key.charCodeAt(index); //19 is another prime
      })
      hash = hash % length //Makes sure hash fits within our table size

      //console.log("hash", hash);
      return hash;
    }

    reHash () {
      let newSize = 2*this.state.holdingArray.length;
      let newHoldingArr = new Array(newSize);
      let localHoldingArr = [...this.state.holdingArray]
      localHoldingArr.forEach((item) => {
        if (item) {
          item.forEach((item2) => {
            let key = item2[0]
            let newInd = this.hashFunction(key, newSize);
            if (!newHoldingArr[newInd]) { //if nothing is in this index, add the item
              newHoldingArr[newInd] = [item2]
              return
            }
            let existingIndex = newHoldingArr[newInd].findIndex(item3 => item3[0] === key)
            if (typeof existingIndex === 'number' && existingIndex !== -1) { //if this key is already in this index's linked list somewhere, update it
              newHoldingArr[newInd][existingIndex] = item2;
              return
            }
            //implied else, if there is an array at this index but this key isn't in it, push this item onto the index
            newHoldingArr[newInd].push(item2);
          })
          this.setState({holdingArray: newHoldingArr});
        }
      })
    }
    
    createSquaresJSX() {
      let localArray = [...this.state.holdingArray];
      let squaresJSX = localArray.map((item, index) => {
        let determineFill = () => {
          if (!item || item.length === 0) {return "empty"}
          if (item.length === 1) {return "filled"}
          if (item.length > 1) {return "multiple"}
        }
        let filledVar = determineFill();
        return(
          <HashSquare key={index} ind={index} fill={filledVar} />
        )
      })
      return squaresJSX
    }

    createLegendJSX() {
      return (
        <div className={classes.legendContainer}>
          <span>Keys at Index:</span>
          <span style={{display: "flex"}}>0
          <div className={classes.legendSquare} style={{backgroundColor: 'transparent'}}></div></span>
          <span style={{display: "flex"}}>1 
          <div className={classes.legendSquare} style={{backgroundColor: 'cyan'}}></div></span>
          <span style={{display: "flex"}}>2+
          <div className={classes.legendSquare} style={{backgroundColor: 'salmon'}}></div></span>
        </div>
      )

    }

    createKeysJSX() {
      let localKeys = [...this.state.keys];
      let keysJSX = localKeys.map((item, index) => {
        item = item.charAt(0).toUpperCase() + item.slice(1); //displays capital names even though under the hood it's lowercase
        if(index < localKeys.length - 1) {
        return (
          <span>{`${item}, `}</span>
        )}
        return (
          <span>{`${item}`}</span>
        )
      })
      return keysJSX
    }

    render() {
      let squaresJSX = this.createSquaresJSX();
      let keysJSX = this.createKeysJSX();
      let createLegendJSX = this.createLegendJSX();
      let addCheck = this.state.nameAdd.trim().length > 0 && this.state.favoriteFoodAdd.trim().length > 0 ? false : true;
      let searchCheck = this.state.nameSearch.trim().length > 0 ? false : true;
      let searchName = this.state.nameSearch;
      return (
        <div className={classes.umbrella}>
          <div className={classes.hashGroup}>
            <div className={classes.keyParent}>
              Keys: {keysJSX}
            </div>
            {createLegendJSX}
            <div className={classes.container}>
                {squaresJSX}
            </div>
            {/* {createLegendJSX} */}
          </div>
        <div>
        <Form>
            <Form.Group style={{textAlign: "left"}}>
              <Form.Label style={{fontWeight: 500}}>Favorite Food Lookup</Form.Label>
              <Form.Control onChange={this.change} name="nameSearch" value={this.state.nameSearch} type="text" placeholder="Enter name to see favorite food" />
            </Form.Group>
            <Button 
              bsPrefix={`${classes.customButton} btn`} 
              disabled={searchCheck} 
              onClick={(e) => {e.preventDefault(); this.searchName(searchName);}} 
              type='submit' 
              variant="success">
              Lookup
            </Button>
          </Form>
          <div>
            {this.state.searchResult}
          </div>
          <Form onSubmit={(e) => {e.preventDefault()}}>
            <Form.Group style={{textAlign: "left"}}>
              <Form.Label style={{fontWeight: 500}}>Person's Name (Key)</Form.Label>
              <Form.Control onChange={this.change} name="nameAdd" value={this.state.nameAdd} type="text" placeholder="Tina, Andrew, etc." />
            </Form.Group>

            <Form.Group style={{textAlign: "left"}}>
              <Form.Label style={{fontWeight: 500}}>Favorite Food (Value)</Form.Label>
              <Form.Control type="text" name="favoriteFoodAdd" onChange={this.change} value={this.state.favoriteFoodAdd} placeholder="Chicken, Sushi, etc." />
            </Form.Group>
            <Button 
              bsPrefix={`${classes.customButton} btn`} 
              disabled={addCheck} 
              onClick={(e) => { e.preventDefault(); this.addName(this.state.nameAdd, this.state.favoriteFoodAdd);}} 
              type='submit' 
              variant="success">
              Add to HashMap
            </Button>
          </Form>
        </div>
      </div>
      );
    }
  }
  
  export default HashLogic;
