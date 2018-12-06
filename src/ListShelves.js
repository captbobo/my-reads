import React, { Component } from 'react'
import { Link } from 'react-router-dom'


export default class ListShelves extends Component {
  // getUniqueShelves = () => {
  //     let shelves, uniqueShelves
  //     shelves = Array.from(this.props.books.map( book => book.shelf ))
  //     uniqueShelves = [...new Set(shelves)]
  //     return uniqueShelves
  //   }

  sortBooksFor= (shelf) => {
    const books = this.props.books
    let sortedBooks
    sortedBooks = books.filter( book => book.shelf === shelf )
    return sortedBooks
  }

  render(){
    const {moveBook, shelfNames} = this.props
    // const shelfNames = this.getUniqueShelves()
    console.log(shelfNames)
    return(
        <div>
          <ShelfHeader name="iReads"/>
          {shelfNames.map( shelf => {
            const booksOfShelf = this.sortBooksFor(shelf)
            return (
              <Shelf name={shelf} key={shelf}>
                {booksOfShelf.map(book =>
                  <Book book={book} key={book.id}
                        moveBook={moveBook}
                        shelf={shelf} shelfList={shelfNames}/>
                )}
              </Shelf>
            )
          })}
          <Link to="/search"
                className="open-search">
            <button>Search</button>
          </Link>
        </div>
    )
  }
}


const beautify = shelfName => {
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

const ShelfHeader = props =>
  <div className="shelf-header">
    <h1 className="shelf-title">{props.name}</h1>
  </div>

const BookShelfHeader = (props) =>
    <div className="bookshelf-header">
      <h2 className="bookshelf-title">{beautify(props.value)}</h2>
    </div>


const Shelf = ({children, ...props}) =>
      <div className="bookshelf">
        <BookShelfHeader value={props.name}/>
        <div className="list-books-content">
          <ol className="books-grid">
            {children}
          </ol>
        </div>
      </div>

export const Book = ({...props}) =>
    <li>
      <div className="book">
        <div className="book-shelf-changer">
          <select id="shelf-select"
              aria-label="Choose a shelf:"
              onChange={ event => props.moveBook( props.book , event.target.value) }>
            <option disabled>Move to...</option>
            <option defaultValue={props.shelf}>{beautify(props.shelf)}</option>
            {props.shelfList.filter( s => s !== props.shelf).map( s => (
              <option key={s} value={s}>{beautify(s)}</option>
            ))}
          </select>
        </div>
        <img className="book-cover"
          src={props.book.imageLinks.smallThumbnail}
          alt={props.book.description}
          />
        <p className="book-title">{props.book.title}</p>
        <p className="book-subtitle">{props.book.subtitle}</p>
        <p className="book-authors">{props.book.authors}</p>
      </div>
    </li>
