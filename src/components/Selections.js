import React, {Component} from 'react';
import Subheader from './Subheader.js';
import Extras from './Extras.js';

class Selections extends Component {
    parseSelected = () => {
        let selected = [];
        let selectedItems;
        for(const item in this.props.allItems){
            selectedItems = this.props.allItems[item].filter(item => item.isSelected === true)
            selected = selected.concat(selectedItems)
        }
        return selected
    }
    extraCheese = () => {
        return this.props.allItems.cheeses.filter(item => item.isSelected === true).length > 2
    }
    render() {
        
        if (this.parseSelected().length > 0) {
            return(
                <div>
                    <Subheader text='You have selected: '/>
                    <Extras 
                        message='Extra cheese is a $2 donation to the Human Fund'
                        toPrint={this.extraCheese()}
                    />
                    <div className="current-selections">
                        {this.parseSelected().map( (item, index) =>
                            <div className="item">
                                <h3 key={index}>{item.name}</h3>
                            </div>
                        )}
                    </div>
                </div>
            )
        } else {
            return(null)
        }
    }
}

export default Selections;