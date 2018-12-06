import React, { Component } from 'react'
import './App.css'
import * as BooksAPI from './BooksAPI.js'
import { Route, Link } from 'react-router-dom'
import ListShelves from './ListShelves'
import Search from './Search'


export default class App extends Component {

  state= {
    books: [],
    uniqueShelves: []
  }

  componentDidMount() {
    BooksAPI.getAll().then( books => {
      const uniqueShelves = this.getUniqueShelves(books)
      this.setState({ books, uniqueShelves })
    })
  }

  getUniqueShelves = (books) => {
      let shelves, uniqueShelves
      shelves = Array.from(books.map( book => book.shelf ))
      uniqueShelves = [...new Set(shelves)]
      return uniqueShelves
    }

  handleShelfChange = (book, newShelf) => {
    this.setState( state => ({
      books: this.state.books.map( b => {
        if(b.id === book.id)
          b.shelf = newShelf
        return b
      })
    }))
    BooksAPI.update(book, newShelf)
  }



  render() {
    const {books, uniqueShelves}= this.state
    console.log(this.state)
    return (
      <div className="app">
        <Route exact path="/" render={()=>
          <ListShelves books={books} moveBook={this.handleShelfChange} shelfNames={uniqueShelves} />
        }/>
        <Route path="/search" render={()=>
          <div className="search">
            <Search myBooks={books} onShelfChange={this.handleShelfChange} shelfNames={uniqueShelves}/>
          </div>
        }/>
      </div>
    )
  }
}
