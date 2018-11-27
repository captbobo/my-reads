import React, { Component } from 'react'
import BookCard from './BookCard'

// function SortBooks(props){
//   const { books, shelf } = props
//   let sortedBooks
//   console.log(props)
//   books && (sortedBooks = books.filter( book => book.shelf === shelf ))
//   sortedBooks = sortedBooks.map(book => (<BookCard key={book.id} item={book}></BookCard>))
// }
//

//


const ShelfName = (props) => {
  return (
    <div className="bookshelf-header">
      <h2 className="bookshelf-title"> {props.value}</h2>
    </div>
  )
}

class ListShelves extends Component {
  state = {
    query: ''
  }

  // returns an array composed of unique shelf names
  setUniqueShelves = (books) => {
    let shelves, uniqueShelves
    shelves = Array.from(books.map( book => book.shelf ))
    uniqueShelves = [...new Set(shelves)]
    return uniqueShelves
  }

  // turns shelf names from raw to reader friendly


  render() {
    const { items } = this.props
    return (
      <div className="bookshelf">
        { this.setUniqueShelves(items).map((shelf) => (
          <ShelfName value={ this.readyShelfNamesForPrint(shelf) }/>
        ))}
        <div className="shelf-content">
          <ol className="books-grid">

          </ol>
        </div>
      </div>
    )
  }
}

export default ListShelves
