import React, { Component } from 'react'
import ListShelf from './ListShelf'
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

  getUniqueShelves = () => {
    let shelves, uniqueShelves
    shelves = Array.from(this.state.books.map( book => book.shelf ))
    uniqueShelves = [...new Set(shelves)]
    return uniqueShelves
  }
  // returns books sorted for the shelf
  sortBooks= (books, shelf) => {
    let sortedBooks
    books && (sortedBooks = books.filter( book => book.shelf === shelf ))
    return sortedBooks
  }

  // turns shelf names from raw to reader friendly
  readyShelfNamesForPrint = (shelf) => {
    switch (shelf) {
      case 'currentlyReading': return "Currently Reading"
      case 'wantToRead': return "Want to Read"
      case 'read': return "Read"
      default: return "Bad Shelf Name"
    }
  }

  changeShelf = (book, newShelf) => {
    this.setState( state => ({
      books: this.state.books.map( b => {
        if(b.id === book.id){
          b.shelf = newShelf
          return b
        }
        else return b
      })
    }))
  }

  render() {
    const { books } = this.state

    return (
      <div className="App">
        <div className="shelf-header">
          <h1>ireads</h1>
        </div>
        {this.getUniqueShelves().map( shelf => (
          <ListShelf key={shelf}
                     shelf={ this.readyShelfNamesForPrint(shelf) }>
            {this.sortBooks(books, shelf).map( book => (
              <BookCard key={book.id} book={book}>
                <SelectShelf shelf={shelf}
                             shelfList={this.getUniqueShelves()}
                             moveBook={(newShelf) => this.changeShelf(book, newShelf)}
                />
              </BookCard>
            ))}
          </ListShelf>
        ))}
      </div>
    )
  }
}

const SelectShelf = (props) => {
  const shelf = props.shelf
  return(
    <select id="shelf-select"
        aria-label="Choose a shelf:"
        onChange={ event => props.moveBook(event.target.value) }>
      <option defaultValue={shelf}>{shelf}</option>
      {props.shelfList.filter( s => s !== shelf).map( s => (
        <option key={s} value={s}>{s}</option>
      ))}
    </select>
)}

export default App;
