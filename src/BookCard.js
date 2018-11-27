import React, { Component } from 'react'


class BookCard extends Component {

  render() {
    const { children, book } = this.props

    return (
      <li>
        <div className="book">
          <div className="book-shelf-changer">
            {children}
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
