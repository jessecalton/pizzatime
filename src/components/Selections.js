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
                        <h4 className="total">Your total is: ${this.props.totalCost}</h4>
                    </div>
                </div>
            )
        } else {
            return(null)
        }
    }
}

export default Selections;