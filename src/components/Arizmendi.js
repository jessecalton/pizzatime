import React, {Component} from 'react';
const axios = require('axios');
// Need this to bypass the CORS denial in localhost...
const proxyurl = "https://cors-anywhere.herokuapp.com/";

class Arizmendi extends Component {
    state = {
        todaysPizza: ''
    }
    
    // Updates the state w/ today's Arizmendi pizza once component mounts
    async componentDidMount () {
            try {
                const taste = await axios.get(proxyurl + 'https://www.arizmendibakery.com/pizza')
                let pizzaStuffHTML = await taste.data.split('class="active"')[1].split('</td>')[0];
                let pizzaStuff = pizzaStuffHTML.split('"yasp-item">')[1].split('</p>')
                console.log(pizzaStuff)
                this.setState({todaysPizza: pizzaStuff})
            } catch (err) {
                console.log('No Pizza Today...')
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
                <h4>Need ideas? Today, which is {this.getTodaysDate()}, Arizmendi's Pizza is serving:</h4>
                <p>{this.state.todaysPizza}</p>
            </div>
        )
    }
}

export default Arizmendi;