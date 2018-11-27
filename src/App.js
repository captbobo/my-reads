import React, { Component } from 'react'
import ListShelves from './ListShelves'
import BookCard from './BookCard'
import './App.css'
import * as BooksAPI from './BooksAPI.js'

class App extends Component {

  state= {
    books: [],
    // shelves: [] // raw names of the shelves inside
  }

  componentDidMount() {
    BooksAPI.getAll().then( books => {
      this.setState({ books })
    })

    /*
      .then(() => (
      this.setShelves()
    ))
    */
  }

  render() {
    const { books } = this.state

    return (
      <div className="App">
        <div className="shelf-header">
          <h1>ireads</h1>
        </div>
          <ListShelves items={books}>
            {books.map( book => ( <BookCard key={book.id} book={book} />))}
          </ListShelves>
      </div>
    );
  }
}

export default App;
