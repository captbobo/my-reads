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
    default: return "Bad Shelf Name"
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
    BooksAPI.update(book, newShelf)
  }


  render() {
    const { books } = this.state
    const shelfNames = this.uniqueShelves()
    const sharedProps = { books: books, shelfNames: this.uniqueShelves(), moveBook: this.handleShelfChange }
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
                  <div className="list-books-content"> {// component ?
                  } <ol className="books-grid">
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
            <Link to="/search" className="open-search">
              <button>Search</button>
            </Link>
          </div>
        }/>
        <Route path="/search" render={()=> <Search {...sharedProps}/> }/>
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

export const Book = props =>
    <li>
      <div className="book">
        {props.children}
        <img className="book-cover"
          src={props.book.imageLinks.smallThumbnail}
          alt={props.book.description}
          />
        <p className="book-title">{props.book.title}</p>
        <p className="book-subtitle">{props.book.subtitle}</p>
        <p className="book-authors">{props.book.authors}</p>
      </div>
    </li>

export const Selector = props =>
  <div className="book-shelf-changer">
    <select id="shelf-select"
        aria-label="Choose a shelf:"
        onChange={ event => props.moveBook( props.book , event.target.value) }>
      <option disabled>Move to shelf:</option>
      {props.shelf &&
        <option defaultValue={ props.shelf ? props.shelf : "" }>{ beautify(props.shelf) }</option> }
      {props.shelfNames.filter( s => s !== props.shelf ).map( s =>
          <option key={s} value={s}>{beautify(s)}</option>
        )}}

    </select>
  </div>
