import React, { Component } from 'react'

class BookCard extends Component {

  state = { shelf: '' }

  handleChange = (event) => {
    this.setState({ shelf:event.target.value })
  }

  render() {
    const { book } = this.props

    return (
      <li>
        <div className="book">
          <div className="book-shelf-changer">
            <select id="shelf-select"
                  aria-label="Choose a shelf:">
              <option defaultValue={ book.shelf }>{ book.shelf }</option>
            </select>
          </div>
          <img className="book-cover"
            src={book.imageLinks.smallThumbnail}
            alt={book.description}
            />
          <p className="book-title">{book.title}</p>
          <p className="book-subtitle">{book.subtitle}</p>
          <p className="book-authors">{book.authors}</p>
        </div>
      </li>
    )}
}

export default BookCard
