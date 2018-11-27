  import React, { Component } from 'react'


  class BookCard extends Component {

    state = { shelf: '' }

    handleChange = (event) => {
      this.setState({ shelf:event.target.value })
    }

    render() {
      const { book, shelves } = this.props

      return (
        <div className="book">
        { //<div className="book-top">
        }
          <select id="shelf-select"
                className="book-shelf-changer"
                aria-label="Choose a shelf:">
            <option defaultValue={ book.shelf }>{ book.shelf }</option>
            { shelves.filter( s => s !== book.shelf ).map( s => (
              <option key={s} value={ s }>{ s }></option>)
              )
            }
          </select>
        { //</div>
        }
        <img className="book-cover"
          src={book.imageLinks.smallThumbnail}
          alt={book.description}
          />
        <p className="book-title">{book.title}</p>
        <p className="book-subtitle">{book.subtitle}</p>
        <p className="book-authors">{book.authors}</p>
      </div>
    )}
}

export default BookCard
