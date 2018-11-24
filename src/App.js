import React, { Component } from 'react'
import ListShelf from './ListShelf'
import './App.css'
import * as BooksAPI from './BooksAPI.js'

class App extends Component {

  state= {
    books: [],
    shelves: []
  }

  componentDidMount() {
    BooksAPI.getAll().then( books => {
      this.setState({ books })
    }).then(() => (
      this.findShelves()
    ))
  }

  findShelves() {
    let shelves = Array.from(this.state.books.map((book) => (book.shelf)))
    shelves = [...new Set(shelves)]
    this.setState({ shelves : shelves })
  }

  render() {
    const {books, shelves} = this.state
    return (
      <div className="App">
        <div className="shelf-header"><h1>ireads</h1></div>
        {shelves.map((shelf) => (
          <ListShelf shelfName={shelf} books={books}/>
        ))} 
      </div>
    );
  }
}

export default App;
