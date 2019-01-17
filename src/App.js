import React, { Component } from 'react'
import './App.css'
import * as BooksAPI from './BooksAPI.js'
import { Route, Link } from 'react-router-dom'
// import Search from './Search'
import Book from './Book'
import Selector from './Selector'

// beautify is a bad name: it just switches
// the string for app or human consumption...
// also, it is not very scalable but works for now
export const beautify = shelfName => {
  switch (shelfName) {
    case 'currentlyReading': return "Currently Reading"
    case 'wantToRead': return "Want to Read"
    case 'read': return "Read"
    case 'Currently Reading': return "currentlyReading"
    case 'Want to Read': return "wantToRead"
    case 'Read': return "read"
    default: return ""
  }
}

export default class App extends Component {

  state= {
    books: [],
    query: '',
    results: []
  }

  componentDidMount() {
    BooksAPI.getAll().then( books => {
      this.setState({ books })
    })
  }
  sortBooks= (shelf) => {
    const books = this.state.books
    let sortedBooks
    sortedBooks = books.filter( book => book.shelf === shelf )
    return sortedBooks
  }

  uniqueShelves = () => {
    let shelves, uniqueShelves
    shelves = Array.from(this.state.books.map( book => book.shelf ))
    uniqueShelves = [...new Set(shelves)]
    return uniqueShelves
  }

  handleChange = (event) => {
    this.setState({ query: event.target.value})
    this.search()
  }

  handleShelfChange = (book, newShelf) => {
    // TODO: change algo
    // this.state.results.map(book => if book findIndex? (one of) myBooks)
    this.setState( state => ({
      books: this.state.books.map( b => {
        if(b.id === book.id)
          b.shelf = newShelf
        return b
      })
    }))
    // app needs a refresh to show the newly
    // added book after adding via search
    BooksAPI.update(book, newShelf).then(res => this.setState(s => s.books = [...s.books, res]))
  }

  // SEARCH FUNCTION

  // search = ( query = this.state.query ) => {
  //     BooksAPI.search( query ).then(re => {
  //       console.log(re)
  //       // this.setState({ results: re })
  //     })
  //   }

  search = ( query = this.state.query ) => {
    console.log(query)
      this.splitQuery(query).map ( (word, index, words) =>
          BooksAPI.search( word )
            .then( re => this.mergeResults( re, index ))
            .then( this.removeDuplicates, this.putResults() )
            .then( this.mergeBooks )
            .then( this.putResults )
            .catch( err => {
                  console.log("err: "+err)
                  this.putResults()
                })
      )
    }
    splitQuery = (query) => {
      let words = query.split(' ')
      words = words.filter( word => word !== '' ) // extra spaces from query
      return words
    }

  mergeResults = (resp, index) => {
    // if this is the second word return combined results
    return !index ? resp : [...this.state.results, ...resp] //.filter( item => item ) // filters undefined items
  }

  removeDuplicates = (resp) => {
    // creates an array of unique book ids
    // scans the response and gets first element with that id
    // and returns that array, ultimately removing duplicates
      return [...new Set(resp.map(b => b.id))].map( id => resp.find( book => book.id === id ))
  }

  mergeBooks = (resp) => {
    // TODO:
    // handleChange and this must merge

    return resp.map( item => {
      let match = this.state.books.find( myBook => myBook.id === item.id)
      return match ? match : item
    })
  }

  putResults = (results = [], loading = false) => {
    if(this.state.query !== ''){
      this.setState({ results: results, loading: loading })
    }
    else {
      this.setState({results: []})
    }
  }

  render() {
    const shelfNames = this.uniqueShelves().sort()
    const sharedProps = { shelfNames: this.uniqueShelves(), moveBook: this.handleShelfChange }
    console.log(this.state)
    return (
      <div className="app">
      {
        // Home view
      }
        <Route exact path="/" render={()=>
          <div>
            <AppHeader appName="iReads"/>
            {shelfNames.map( shelf => {
              const onShelf = this.sortBooks(shelf)
              return (
                <div key={shelf} className="bookshelf">
                  <ShelfHeader name={beautify(shelf)}/>
                  <div className="list-books-content">
                    <ol className="books-grid">
                      {onShelf.map( book =>
                        <Book key={book.id} book={book}>
                          <Selector book={book}
                                    shelf={shelf}
                                    {...sharedProps}/>
                        </Book>
                      )}
                    </ol>
                  </div>
                </div>
              )
            })}
            <Link to="/search" className="open-search">
              <button>Search</button>
            </Link>
          </div>
        }/>
        {
        // Search View
        }
        <Route path="/search" render={()=>
          <div className="search">
            <div className="search-books-bar">
              <div className="search-books-input-wrapper">
                <input
                  className='search-books'
                  type='text'
                  placeholder='Search books'
                  value={ this.state.query }
                  onChange={ this.handleChange }/>
              </div>
              <Link to="/" className="close-search"/>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                {this.state.results.map( book =>
                  <Book book={book} key={book.id} shelf={null}>
                    <Selector book={book} shelf={book.shelf} {...this.props}/>
                  </Book>)
                }
              </ol>
            </div>
          </div>
        }/>
      </div>
      )}
    }

const AppHeader = props =>
  <div className="shelf-header">
    <h1 className="shelf-title">{props.appName}</h1>
  </div>

const ShelfHeader = props =>
  <div className="bookshelf-header">
    <h2 className="bookshelf-title">{props.name}</h2>
  </div>
