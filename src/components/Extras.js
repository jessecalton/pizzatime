import React from 'react';

const Extras = ({ message, toPrint }) => {
  if (toPrint === true) {
    return <h3 className='extras'>{message}</h3>;
  } else {
    return null;
  }
};

export default Extras;
