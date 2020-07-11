import React, { Component } from 'react';
import Item from './Item.js';
import Subheader from './Subheader.js';

class Menu extends Component {
  render() {
    return (
      <div>
        <Subheader text={this.props.text} />
        <div className='menu'>
          {this.props.items.map((item, index) => (
            <Item
              item={item}
              key={item.id.toString()}
              index={index}
              itemSelected={this.props.selectItem}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Menu;
