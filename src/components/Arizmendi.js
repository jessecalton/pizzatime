import React, {Component} from 'react';
import ReactTooltip from 'react-tooltip'
const axios = require('axios');
// Need this to bypass the CORS denial in localhost...
const proxyurl = "https://cors-anywhere.herokuapp.com/";

class Arizmendi extends Component {
    state = {
        todaysPizza: 'Loading...'
    }
    // Takes the HTML pizza string and makes it look like a real menu
    sanitizePizzaMenu = (pizza) => {
        // Remove the HTML
        let pizzaString = pizza.split('class="active"')[1].split('</td>')[0].split('"yasp-item">')[1].split('</p>')[0];
        let formattedPizza = pizzaString.replace('p&p', 'parmesan & parsley')
        // Titleize the pizza toppings
        formattedPizza = formattedPizza.split(' ').map(ingredient => ingredient.charAt(0).toUpperCase() + ingredient.substring(1)).join(' ')
        return formattedPizza;
    }
    // Updates the state w/ today's Arizmendi pizza once component mounts
    async componentDidMount () {
        try {
            const taste = await axios.get(proxyurl + 'https://www.arizmendibakery.com/pizza')
            let pizzaStuffHTML = await taste.data
            this.setState(() => {
                const todaysPizza = this.sanitizePizzaMenu(pizzaStuffHTML);
                return {todaysPizza: todaysPizza}
            })
        } catch (err) {
            return {todaysPizza: 'Could not get pizza...'}
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
        return (
            <div>
                <h4 className='ideas-header'>Need ideas? Today, which is {this.getTodaysDate()}, <a href="https://www.arizmendibakery.com/pizza">Arizmendi's Pizza</a> is serving:</h4>
                <div className='ideas'>{this.state.todaysPizza} 
                    <span aria-label="savouring food" role="img"> 😋</span>
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