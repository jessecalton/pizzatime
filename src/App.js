import React, {Component} from 'react';
import './App.css';
import Header from './components/Header.js';
import Menu from './components/Menu.js';
import Selections from './components/Selections.js';

class App extends Component {
  state = {
    breadItems: [
      {name: 'Sourdough', isSelected: false, id: 1}, 
      {name: 'Wheat', isSelected: false, id: 2}, 
      {name: 'Marble Rye', isSelected: false, id: 3}
    ]
  }
  handleSelectedItem = (index) => {
    this.setState( prevState => {
      const updatedSelect = [...prevState.breadItems];
      const updatedItem = { ...updatedSelect[index] };
      updatedItem.isSelected = !updatedItem.isSelected;

      updatedSelect[index] = updatedItem;
      return {
        breadItems: updatedSelect
      };
    });
  }

  retrieveAllSelectedItems = () => {
    return (
      this.state.breadItems.filter(item => item.isSelected === true)
    )
  }

  render() {
    return (
      <div className="App">
        <Header text='Welcome to my App about Pizza'/>
        <Menu 
          items={this.state.breadItems} 
          selectItem={this.handleSelectedItem}
          text='What kind of pizza crust do you want?'
        />
        <Selections allItems={this.retrieveAllSelectedItems()}/>
      </div>
    );
  }
}

export default App;
