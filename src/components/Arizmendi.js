import React, {Component} from 'react';
import ReactTooltip from 'react-tooltip'
const axios = require('axios');
// Need this to bypass the CORS denial in localhost...
const proxyurl = "https://cors-anywhere.herokuapp.com/";

class Arizmendi extends Component {
    state = {
        todaysPizza: 'Loading...',
        pizzaLoaded: null
    }
    // Takes the HTML pizza string and makes it look like a real menu
    sanitizePizzaMenu = (pizza) => {
        let formattedPizza;
        try {
            // Remove the HTML
            let pizzaString = pizza.split('class="active"')[1].split('</td>')[0].split('"yasp-item">')[1].split('</p>')[0];
            formattedPizza = pizzaString.replace('p&p', 'parmesan & parsley')
            // Titleize the pizza toppings
            formattedPizza = formattedPizza.split(' ').map(ingredient => ingredient.charAt(0).toUpperCase() + ingredient.substring(1)).join(' ')
            this.setState({todaysPizza: formattedPizza, pizzaLoaded: true})
        } catch {
            formattedPizza = "Arizmendi's is closed due to KOVID KEVIN"
            this.setState({todaysPizza: formattedPizza, pizzaLoaded: false})
        }
    }
    // Updates the state w/ today's Arizmendi pizza once component mounts
    async componentDidMount () {
        try {
            const taste = await axios.get(proxyurl + 'https://www.arizmendibakery.com/pizza')
            let pizzaStuffHTML = taste.data
            this.sanitizePizzaMenu(pizzaStuffHTML);
        } catch (err) {
            this.setState({todaysPizza: 'Could not get pizza...', pizzaLoaded: false})
        }
    }
    
    // Gets todays date formatted like 03/15/2020
    getTodaysDate = () => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;
    return today
    }
    render() {
        let emoji = null;
        if (this.state.pizzaLoaded) {
            emoji = <span aria-label="savouring food" role="img"> 😋</span>
        } else if (this.state.pizzaLoaded === false) {
            emoji = <span aria-label="sad face" role="img"> 😞</span>
        }
        return (
            <div>
                <h4 className='ideas-header'>Need ideas? Today, which is {this.getTodaysDate()}, <a href="https://www.arizmendibakery.com/pizza">Arizmendi's Pizza</a> is serving:</h4>
                <div className='ideas'>{this.state.todaysPizza} 
                    {emoji}
                </div>
                <div>
                    <span className='pointer-emojis' aria-label="pointing right" role="img"> 👉</span>
                        <span className='tooltip' data-tip="This app doesn't actually order pizza. You should go get it from Arizmendi Bakery.">
                        Hover over me
                        </span>
                    <span className='pointer-emojis' aria-label="pointing left" role="img">👈</span>
                </div>
                <ReactTooltip />
            </div>
        )
    }
}

export default Arizmendi;