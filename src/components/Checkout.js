import React from 'react';

const Checkout = (props) => {
    let checkout = null;
    if(props.display === true && props.humanFund === true) {
        checkout = (
        <div>
            <h3 style={{color: 'red'}}>Pizza is on the way! Thank you for your order!</h3>
            <h2 style={{color: 'green'}}>Thank you for your donation to the Human Fund! Thanks to your generosity, we will all have a Happy Festivus!</h2>
        </div>
        )
    } else if(props.display === true) {
        checkout = (
            <h3 style={{color: 'red'}}>Pizza is on the way! Thank you for your order!</h3>
        )
    }
    window.scrollTo(0,0);
    return(<div>{checkout}</div>)

}

export default Checkout;