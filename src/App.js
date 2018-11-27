import React, { Component } from 'react'
import ListShelves from './ListShelves'
import BookCard from './BookCard'
import './App.css'
import * as BooksAPI from './BooksAPI.js'

class App extends Component {

  state= {
    books: [],
  }

  componentDidMount() {
    BooksAPI.getAll().then( books => {
      this.setState({ books })
    })
  }

  // returns an array composed of unique shelf names
  setUniqueShelves = (books) => {
    let shelves, uniqueShelves
    shelves = Array.from(books.map( book => book.shelf ))
    uniqueShelves = [...new Set(shelves)]
    return uniqueShelves
  }
  // returns books sorted for the shelf
  sortBooks= (books, shelf) => {
    let sortedBooks
    books && (sortedBooks = books.filter( book => book.shelf === shelf ))
    return sortedBooks
  }

  render() {
    const { books } = this.state

    return (
      <div className="App">
        <div className="shelf-header">
          <h1>ireads</h1>
        </div>
        {this.setUniqueShelves(books).map( shelf => (
          <ListShelves key={shelf}
                       shelf={shelf}>
            {this.sortBooks(books, shelf).map( book => (
              <BookCard key={book.id} book={book}/>
            ))}
          </ListShelves>
        ))}
      </div>
    )
  }
}

export default App;
