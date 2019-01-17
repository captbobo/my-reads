import React, { Component } from 'react'

export default class Book extends Component {

  fixThumbnail = (book) => {
      return book.hasOwnProperty('imageLinks') ?
        book.imageLinks.smallThumbnail : "https://via.placeholder.com/150"
    }

  render(){
    const {children, book} = this.props
    return (
      <li key={book.id}>
        <div className="book">
          {children}
          <img className="book-cover"
            src={this.fixThumbnail(book)}
            alt={book.description}
          />
        <p className="book-title">{book.title}</p>
        <p className="book-subtitle">{book.subtitle}</p>
        <p className="book-authors">{book.authors}</p>
        </div>
      </li>

    )
  }
}
