import React, {Component} from 'react';
import Subheader from './Subheader.js';
import Extras from './Extras.js';

class Selections extends Component {
    parseSelected = () => {
        let selected = [];
        const bread = this.props.allItems.breadItems.filter(item => item.isSelected === true)
        const cheese = this.props.allItems.cheeses.filter(item => item.isSelected === true)
        const toppings = this.props.allItems.toppings.filter(item => item.isSelected === true)

        return selected.concat(bread, cheese, toppings)
    }
    // extraCheese = () => {
    //     return this.props.allItems.cheeses.filter(item => item.isSelected === true).length > 2
    // }
    getTotal = () => {
        let totalCost = 0.0;
        const selectedBread = this.props.allItems.breadItems.filter(item => item.isSelected === true)
        const selectedCheese = this.props.allItems.cheeses.filter(item => item.isSelected === true)
        const selectedToppings = this.props.allItems.toppings.filter(item => item.isSelected === true)
        if (selectedBread.length === 1) {
            totalCost += 8.0
        }
        if (selectedCheese.length > 2) {
            totalCost += 6.0
        } else if (selectedCheese.length >= 1) {
            totalCost += 4.0
        }
        totalCost += selectedToppings.length * 0.50
        return `$${Math.abs(totalCost).toFixed(1)}`
    }
    render() {
        
        if (this.parseSelected().length > 0) {
            window.scrollTo(0,document.body.scrollHeight / 3);
            return(
                <div>
                    <Subheader text='You have selected: '/>
                    <Extras 
                        message='Extra cheese is a $2 donation to the Human Fund'
                        toPrint={this.props.humanFund}
                    />
                    <div className="current-selections">
                        {this.parseSelected().map( (item, index) =>
                            <div key={index} className="item">
                                <h3>{item.name}</h3>
                            </div>
                        )}
                    </div>
                    <div>
                        <h4 className="total">Your total is: {this.getTotal()}</h4>
                    </div>
                </div>
            )
        } else {
            return(null)
        }
    }
}

export default Selections;