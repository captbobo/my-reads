import React, { Component } from 'react'
import ListLibrary from './ListLibrary'
import './App.css'
import * as BooksAPI from './BooksAPI.js'

class App extends Component {

  state= {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then( books => {
      this.setState({ books })
    })
  }


  render() {
    return (
      <div className="App">
        <ListLibrary libraryName="currentlyReading" books={this.state.books}/>
        <ListLibrary libraryName="read" books={this.state.books}/>
        <ListLibrary libraryName="wantToRead" books={this.state.books}/>
      </div>
    );
  }
}

export default App;
