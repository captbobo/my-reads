import React, { Component } from 'react'
import BookCard from './BookCard'


class ListShelf extends Component {

  shelfSwitch = (shelfName) => {
    switch(shelfName) {
      case 'read': return "Read"
      case 'currentlyReading': return 'Currently Reading'
      case 'wantToRead' : return 'Want To Read'
      default: return 'hello'
    }
  }


  render() {
    const { books, shelfName } = this.props

    let sortedBooks
    books && (sortedBooks = books.filter((book) => book.shelf === shelfName))

    return (
      <div className="bookshelf">
        <div className="bookshelf-header">
          <h2 className="bookshelf-title">{this.shelfSwitch(shelfName)}</h2>
        </div>
        <div className="shelf-content">
          <ol className="books-grid">
            {sortedBooks.map((book) => (
              <li key={book.id} >
                <BookCard book={book}/>
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default ListShelf
