import React, {Component} from 'react';

class Item extends Component {
   
    render() {
        return (
            <div onClick={() => this.props.itemSelected(this.props.index)} 
                className={this.props.item.isSelected ? "item-selected" : "item"}
            >
                <h3>{this.props.item.name}</h3>
            </div>
        );
    }
}

export default Item;