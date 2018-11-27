import React, { Component } from 'react'

class BookCard extends Component {

  state = { shelf: '' }

  handleChange = (event) => {
    this.setState({ shelf:event.target.value })
  }

  render() {
    const { book } = this.props

    return (
      <div className="book">
        <select id="shelf-select"
              className="book-shelf-changer"
              aria-label="Choose a shelf:">
          <option defaultValue={ book.shelf }>{ book.shelf }</option>
        </select>
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
