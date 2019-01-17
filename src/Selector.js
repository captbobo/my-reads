import React, { Component } from 'react'
import { beautify } from './App'
export default class Selector extends Component {

  render(){
    const {book, moveBook, shelf, shelfNames} = this.props
    return (
      <div className="book-shelf-changer">
        <select id="shelf-select"
        aria-label="Choose a shelf:"
        onChange={ event => moveBook( book , event.target.value) }>
          <option disabled>Move to shelf:</option>
          { shelf ? <option key={shelf} defaultValue={shelf}>{ beautify(shelf) }</option>
                  : <option>Not in library</option> }
          {shelfNames ?
            shelfNames.filter( s => s !== shelf ).map( (s, index) =>
              <option key={ index } value={ s }>{ beautify(s) }</option> )
            : <option disabled>You have no shelves!</option>
          }
        </select>
      </div>
    )

  }

}
