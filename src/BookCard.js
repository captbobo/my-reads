  import React, { Component } from 'react'


  class BookCard extends Component {

    render() {
      const { book } = this.props

      return (
      <div className="book">
        <div className="book-shelf-changer-container">
          <select className="book-shelf-changer"></select>
          {console.log(book)}
        </div>
        <img
          className="book-cover"
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
