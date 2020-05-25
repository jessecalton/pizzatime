import React, {Component} from 'react';
import Header from './Header';
import Button from './Button';
import {Link} from 'react-router-dom';

class Checkout extends Component {
    state = {
        pizza: {},
        finalPrice: 0,
        humanFund: false
    }

    componentDidMount () {
        const query = new URLSearchParams(this.props.location.search);
        let humanFund;
        let finalPrice;
        let pizza = {};
        for (let param of query.entries()) {
            if (param[0] === 'humanfund') {
                humanFund = param[1]
            } else if (param[0] === 'price') {
                finalPrice = param[1]
            } else {
                pizza[param[0]] = param[1]
            }
        }
        this.setState({
            humanFund: humanFund,
            finalPrice: finalPrice,
            pizza: pizza
        })
    }
    render() {
        console.log(this.state)
        let humanFund = null;
        if(this.state.humanFund === 'true') {
            humanFund = (
            <div>
                <h2 style={{color: 'green', textAlign: 'center'}}>Thank you for your donation to the Human Fund! Thanks to your generosity, we will all have a Happy Festivus!</h2>
            </div>
            )
        }
        let pizzaMessage = null;
        let pizza = []
        if (this.state.finalPrice > 0) {
            for (let item in this.state.pizza) {
                if (this.state.pizza[item] === "") continue
                pizza.push(this.state.pizza[item] + ', ')
            }
            pizza = pizza.join('').slice(0, -2)
            pizzaMessage = <p> My very own {pizza} pizza - just for me. </p>
        } else {
            pizzaMessage = <p> You didn't actually order a pizza dude... </p>
        }
        return (
            <div >
                <Header text='Pizza is on the way! Thank you for your order!'/>
                <div className='Checkout'>
                    {humanFund}
                    <p>
                        Your total comes to: <strong>${this.state.finalPrice}</strong>
                    </p>
                    {pizzaMessage}
                    <Link to="/">
                        <Button>Make another pizza</Button>
                    </Link>
                </div>

            </div>
        )
    }
    

}

export default Checkout;