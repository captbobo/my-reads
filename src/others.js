import React, { Component } from 'react'
import {Book, Selector, beautify} from './App'


const listBooks = Wrapped => {
  return class Shelved extends Component {
    sortBooks= (shelf) => {
      const books = this.state.books
      let sortedBooks
      sortedBooks = books.filter( book => book.shelf === shelf )
      return sortedBooks
    }
    uniqueShelves = () => {
      let shelves, uniqueShelves
      shelves = Array.from(this.props.books.map( book => book.shelf ))
      uniqueShelves = [...new Set(shelves)]
      return uniqueShelves
    }
    render(){
      const shelfNames = this.uniqueShelves()
      return (
        <div>
          {shelfNames.map( shelf => {
            const onShelf = this.sortBooks(shelf)
            return (
              <div key={shelf} className="bookshelf">
                <div className="bookshelf-header">
                  <h2 className="bookshelf-title">{beautify(shelf)}</h2>
                </div>
                <div className="list-books-content">
                  <ol className="books-grid">
                    {onShelf.map( book =>  // could this be achieved with a method instead? or a HOC?
                      <Book key={book.id} book={book}>
                        <Selector book={book}
                                  shelf={shelf}
                                  moveBook={this.handleShelfChange}
                                  shelfNames={shelfNames}/>
                      </Book>
                    )}
                  </ol>
                </div>
              </div>
            )
          })}
        </div>
      )
    }

  }
}
