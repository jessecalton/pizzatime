import React, {Component} from 'react';
import './App.css';
import Header from './components/Header.js';
import Menu from './components/Menu.js';
import Selections from './components/Selections.js';
import Arizmendi from './components/Arizmendi.js';
import Checkout from './components/Checkout.js';

class App extends Component {
  state = {
    breadItems: [
      {name: 'Sourdough', isSelected: false, id: 1}, 
      {name: 'Wheat', isSelected: false, id: 2}, 
      {name: 'Marble Rye', isSelected: false, id: 3},
      {name: 'Cornflour', isSelected: false, id: 4}
    ],
    cheeses: [
      {name: 'Mozzarella', isSelected: false, id: 1},
      {name: 'Parmesan', isSelected: false, id: 2},
      {name: 'Goat', isSelected: false, id: 3},
      {name: 'Ricotta', isSelected: false, id: 4},
      {name: 'Romano', isSelected: false, id: 5},
      {name: 'Orange', isSelected: false, id: 6}
    ],
    toppings: [
      {name: 'Basil', isSelected: false, id: 1},
      {name: 'Mushrooms', isSelected: false, id: 2},
      {name: 'Potato', isSelected: false, id: 3},
      {name: 'Onion', isSelected: false, id: 4},
      {name: 'Bosco', isSelected: false, id: 5}
    ],
    orderComplete: false,
    humanFund: false
  }

  resetState = () => {
    this.setState(prevState => {
      const resetBread = [ ...prevState.breadItems ].map(bread => {
        bread.isSelected = false
        return bread
      })
      const resetCheese = [ ...prevState.cheeses ].map(cheese => {
        cheese.isSelected = false
        return cheese
      })
      const resetToppings = [ ...prevState.toppings ].map(topping => {
        topping.isSelected = false
        return topping
      })
      return {
        breadItems: resetBread,
        cheeses: resetCheese,
        toppings: resetToppings,
        orderComplete: true
      }
    })
  }

  // Only one bread type can be selected
  handleSelectedBread = (index) => {
    this.setState( prevState => {
      const breadState = [...prevState.breadItems]
      const updatedItem = { ...breadState[index] };
      if(updatedItem.isSelected === false){
        breadState.map(bread => {
          bread.isSelected = false;
          return bread
        });
      } 
      updatedItem.isSelected = !updatedItem.isSelected;
      breadState[index] = updatedItem;
      return {
        breadItems: breadState
      };
    });
  };

  handleSelectedToppings = (index) => {
    this.setState( prevState => {
      const toppingsState = [...prevState.toppings];
      const updatedItem = {...toppingsState[index]};
      updatedItem.isSelected = !updatedItem.isSelected;
      toppingsState[index] = updatedItem;
      return {
        toppings: toppingsState
      };
    });
  };

  // setHumanFundState = () => {
  //   this.setState( prevState => {
  //     let human = [...prevState.cheeses].filter(item => item.isSelected === true).length > 2
  //     console.log(human)
  //     return {
  //       humanFund: human
  //     }
  //   })
  // }

  handleSelectedCheese = (index) => {
    this.setState( prevState => {
      const cheeseState = [...prevState.cheeses];
      const updatedItem = { ...cheeseState[index] };
      const selectedCheese = cheeseState.reduce((count, cheese) => {
        if(cheese.isSelected){
          count++;
        }
        return count;
      },0)

      if(selectedCheese === 3 && updatedItem.isSelected === true){
        // If 3 are selected, this deselects a cheese
        updatedItem.isSelected = !updatedItem.isSelected;
        cheeseState[index] = updatedItem;
      } else if(selectedCheese === 3){
        // If 3 are already selected, does not allow selecting more
        return {
          cheeses: cheeseState
        };
      } else {
        updatedItem.isSelected = !updatedItem.isSelected;
        cheeseState[index] = updatedItem;
      }
      // Yes I'm repeating myself here, but I'm tired and want it to work
      const newCheeseCount = cheeseState.reduce((count, cheese) => {
        if(cheese.isSelected){
          count++;
        }
        return count;
      },0)
      const humanFund = newCheeseCount === 3 ? true : false
      return {
        cheeses: cheeseState,
        humanFund: humanFund
      };
    })
  }

  render() {
    return (
      <div className="App">
        <Header text='Welcome to my App about Pizza'/>
        <Checkout display={this.state.orderComplete} humanFund={this.state.humanFund}/>
        <Arizmendi />
        <Menu 
          items={this.state.breadItems} 
          selectItem={this.handleSelectedBread}
          text='What kind of pizza crust do you want? (Pick One)'
        />
        <Menu 
          items={this.state.cheeses}
          selectItem={this.handleSelectedCheese}
          text='What kinds of cheese do you want? (Pick 2, 3 is extra $$$)'
        />
        <Menu 
          items={this.state.toppings}
          selectItem={this.handleSelectedToppings}
          text='Pick as many toppings as you want! $.50 each.'
        />
        <Selections allItems={this.state} humanFund={this.state.humanFund}/>
        <button onClick={this.resetState}>Order my Pizza!</button>
      </div>
    );
  }
}

export default App;
