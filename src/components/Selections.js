import React, {Component} from 'react';
import Subheader from './Subheader.js'

class Selections extends Component {
    render() {
        if (this.props.allItems.length > 0) {
            return(
                <div>
                    <Subheader text='You have selected: '/>
                    {this.props.allItems.map( (item) =>
                        <h3 key={item.id}>{item.name}</h3>
                    )}
                </div>
            )
        } else {
            return(null)
        }
    }
}

export default Selections;