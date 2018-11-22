import React, { Component } from 'react'


class ListLibrary extends Component {

  libSwitch = (libraryName) => {
    switch(libraryName) {
      case 'read': return "Read"
      case 'currentlyReading': return 'Currently Reading'
      case 'wantToRead' : return 'Want To Read'
      default: return 'hello'
    }
  }


  render() {
    const { books, libraryName } = this.props

    let sortedBooks
    books && (sortedBooks = books.filter((book) => book.shelf === libraryName))

    return (
      <div className="library">
        <div className="library-header">
          <h2>{this.libSwitch(libraryName)}</h2>
          <div className="book-list">{console.log(sortedBooks)}{console.log(books)}
            <ol>
              {sortedBooks.map((book) => (
                <li key={book.id} className="book-item">
                  // <Book/>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    )
  }
}

export default ListLibrary
