import React, {Component} from 'react';
import {BrowserRouter, Route, Switch, Link} from 'react-router-dom';
import './App.css';
import Header from './components/Header.js';
import Menu from './components/Menu.js';
import Selections from './components/Selections.js';
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
    ]
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
      }
    });
  }

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
        updatedItem.isSelected = !updatedItem.isSelected;
        cheeseState[index] = updatedItem;
      } else if(selectedCheese === 3){
        return {
          cheeses: cheeseState
        };
      } else {
        updatedItem.isSelected = !updatedItem.isSelected;
        cheeseState[index] = updatedItem;
      }
      return {
        cheeses: cheeseState
        
      };
    })
  }

  render() {
    return (
      <div className="App">
        <Header text='Welcome to my App about Pizza'/>
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
        <Selections allItems={this.state}/>
        <BrowserRouter>
            <Link to="/checkout">Click me</Link>
            <Switch>
              <Route exact path="/" component={App} />
              <Route path="/checkout">
                <Checkout />
              </Route>
            </Switch>
        </BrowserRouter>
        
      </div>
    );
  }
}

export default App;
