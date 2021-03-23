import React, { Component } from 'react';
import HashSquare from './HashSquare';
import classes from './HashLogic.module.css';

class HashLogic extends Component {
    constructor(props) {
      super(props);
      this.state = {
        holdingArray: new Array(5),
        numItems: 0,
        keys: []
      }
    }

    componentDidUpdate(prevProps, prevState) {
      if (prevState.numItems !== this.state.numItems) {
        let loadFactor = this.state.numItems / this.state.holdingArray.length;
        if (loadFactor > 0.7) {this.reHash()};
      }
    }

    async componentDidMount() {
      await this.addItem("Maddie", "Salad");
      await this.addItem("Jane", "Cookies");
      await this.addItem("James", "Pizza");
      //this.autoDelayEntry();
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
      
      // setTimeout(() => {this.addItem("Jim", "Pizza")}, 250)
      // setTimeout(() => {this.addItem("Adam", "Salad")}, 500)
      // setTimeout(() => {this.addItem("Sarah", "Ice Cream")}, 750)
      // setTimeout(() => {this.addItem("Bob", "Raisin Bran")}, 1000)
      // setTimeout(() => {this.addItem("Bill", "Bananas")}, 1250)
      // setTimeout(() => {this.addItem("Aria", "Apples")}, 1500)
      // setTimeout(() => {this.addItem("Bernie", "Strawberries")}, 1750)
      // setTimeout(() => {this.addItem("Donald", "Mangos")}, 2000)
      // setTimeout(() => {this.addItem("Tim", "Oranges")}, 2250)
      // setTimeout(() => {this.addItem("Tammy", "Lemons")}, 2509)
      // setTimeout(() => {this.addItem("Barry", "Limes")}, 2750)
      // setTimeout(() => {this.addItem("Dan", "Brussel Sprouts")}, 3000)
      // setTimeout(() => {this.addItem("Leo", "Burgers")}, 3250)
      // setTimeout(() => {this.addItem("Carter", "Chilli")}, 3500)
      // setTimeout(() => {this.addItem("Alex", "Chicken")}, 3750)
      // setTimeout(() => {this.addItem("Virgil", "Fish")}, 4000)
      // setTimeout(() => {this.addItem("Lorenzo", "Ranch Dressing")}, 4250)
      // setTimeout(() => {this.addItem("Christina", "Spicy Chicken")}, 4500)
      // setTimeout(() => {this.addItem("Rasaan", "Alfredo Pasta")}, 4750)
      // setTimeout(() => {this.addItem("Lisa", "Chinese Food")}, 5000)
      // setTimeout(() => {this.addItem("Chris", "Oatmeal")}, 5250)
      // setTimeout(() => {this.addItem("Daniel", "Brocolli")}, 5500)
      // setTimeout(() => {this.addItem("Fred", "Tacos")}, 5750)
    }

    retrieveItem (key) {
      let index = this.hashFunction(key);
      let item = this.state.holdingArray[index];
      if (!Array.isArray(item)) {
        alert('Item does not exist in HashMap');
        return
      };
      let returnValue;
      for (let i = 0; i<item.length && !returnValue; i++) {
        if (item[i][0] === key) {returnValue = item[i][1]};
      }
      return returnValue ? returnValue : "No value found";
    }

    addItem(key, value) {
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
      console.log("existingIndex", existingIndex);
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
        localKeys
      })
      resolve(index);

      })
    }

    hashFunction (key, newSize) {
      /**
       * This function returns a seemingly random but consistent and 
       * predictable index for a given key to be stored in the hash table.
       */
      if (typeof key !== 'string') {alert("key must be a string"); return} //guard clause
      let hash = 13; //prime
      let length = newSize || this.state.holdingArray.length;
      let arrKey = [...key];
      arrKey.forEach((letter, index) => {
        hash *= 19*key.charCodeAt(index); //19 is another prime
      })
      hash = hash % length //Makes sure hash fits within our table size
      console.log("hash", hash);
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
            if (existingIndex) { //if this key is already in this index's linked list somewhere, update it
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

    createKeysJSX() {
      let localKeys = [...this.state.keys];
      let keysJSX = localKeys.map((item, index) => {
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
      return (
        <div>
          <div className={classes.container}>
              {squaresJSX}
          </div>
          <div>
          Keys: {keysJSX}
        </div>
      </div>
      );
    }
  }
  
  export default HashLogic;
