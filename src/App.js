import React, { Component } from 'react'
import './App.css'
import * as BooksAPI from './BooksAPI.js'
import { Route, Link } from 'react-router-dom'
import Search from './Search'

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
  
  handleShelfChange = (book, newShelf) => {
    this.setState( state => ({
      books: this.state.books.map( b => {
        if(b.id === book.id)
          b.shelf = newShelf
        return b
      })
    }))
    // app needs a refresh to show the newly
    // added book after adding via search
    BooksAPI.update(book, newShelf).then(res => this.setState(s => [...s.books, res]))
  }

  render() {
    const { books } = this.state
    const shelfNames = this.uniqueShelves().sort()
    const sharedProps = { shelfNames: this.uniqueShelves(), moveBook: this.handleShelfChange }
    return (
      <div className="app">
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
                      {onShelf.map( book =>  // could this be achieved with a method instead? or a HOC?
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
        <Route path="/search" render={()=> <Search books={books} {...sharedProps}/> }/>
      </div>
    )
  }
}

const AppHeader = props =>
  <div className="shelf-header">
    <h1 className="shelf-title">{props.appName}</h1>
  </div>

const ShelfHeader = props =>
  <div className="bookshelf-header">
    <h2 className="bookshelf-title">{props.name}</h2>
  </div>

export class Book extends Component {

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

export class Selector extends Component {

  render(){
    const {book, moveBook, shelf, shelfNames} = this.props
    return (
      <div className="book-shelf-changer">
        <select id="shelf-select"
        aria-label="Choose a shelf:"
        onChange={ event => moveBook( book , event.target.value) }>
          <option disabled>Move to shelf:</option>
          { shelf ? <option key={shelf} defaultValue={shelf}>{ beautify(shelf) }</option>
                  : <option>Not in library</option> }
          {shelfNames ?
            shelfNames.filter( s => s !== shelf ).map( (s, index) =>
              <option key={ index } value={ s }>{ beautify(s) }</option> )
            : <option disabled>You have no shelves!</option>
          }
        </select>
      </div>
    )

  }
}
