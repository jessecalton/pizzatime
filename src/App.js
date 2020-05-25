import React, {Component} from 'react';
import './App.css';
import Header from './components/Header.js';
import Menu from './components/Menu.js';
import Selections from './components/Selections.js';
import Arizmendi from './components/Arizmendi.js';

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
    humanFund: false,
    totalCost: 0.0
  }

componentDidUpdate (prevProps, prevState) {
  let totalCost = 0.0;
  const selectedBread = this.state.breadItems.filter(item => item.isSelected === true)
  const selectedCheese = this.state.cheeses.filter(item => item.isSelected === true)
  const selectedToppings = this.state.toppings.filter(item => item.isSelected === true)
  if (selectedBread.length === 1) {
      totalCost += 8.0
  }
  if (selectedCheese.length > 2) {
      totalCost += 6.0
  } else if (selectedCheese.length >= 1) {
      totalCost += 4.0
  }
  totalCost += selectedToppings.length * 0.50
  totalCost = `${Math.abs(totalCost).toFixed(1)}`
  if (totalCost !== prevState.totalCost) {
    this.setState({totalCost: totalCost})  
  }
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

  // Updates which toppings have been selected, as many toppings as the user wants.
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

  // Updates cheese selection. User can select up to 3, wherein the `humanFund`
  // state is updated.
  handleSelectedCheese = (index) => {
    this.setState( prevState => {
      const cheeseState = [...prevState.cheeses];
      const updatedItem = { ...cheeseState[index] };
      // Count the current total of selected cheeses
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

  checkoutHandler = () => {
    const queryParams = []
    const selectedBread = this.state.breadItems.filter(item => item.isSelected === true).map(bread => bread.name)
    queryParams.push("bread=" + encodeURIComponent(selectedBread))
    let selectedCheese = this.state.cheeses.filter(item => item.isSelected === true).map(cheese => cheese.name)
    queryParams.push("cheese=" + encodeURIComponent(selectedCheese.join(' ')))
    const selectedToppings = this.state.toppings.filter(item => item.isSelected === true).map(topper => topper.name)
    queryParams.push("toppings=" + encodeURIComponent(selectedToppings.join(' ')))
    queryParams.push("humanfund=" + this.state.humanFund)
    queryParams.push("price=" + this.state.totalCost)
    const queryString = queryParams.join('&');
    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryString
  })
  }

  render() {
    return (
      <div className="App">
        <Header text='Welcome to my App about Pizza'/>
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
        <Selections allItems={this.state} totalCost={this.state.totalCost} humanFund={this.state.humanFund}/>
        <button onClick={this.checkoutHandler}>Order my Pizza!</button>
      </div>
    );
  }
}

export default App;
