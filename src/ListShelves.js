import React, { Component } from 'react'
import BookCard from './BookCard'

// function

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

  // turns shelf names from raw to reader friendly
  readyShelfNamesForPrint = (shelf) => {
    switch (shelf) {
      case 'currentlyReading': return "Currently Reading"
      case 'wantToRead': return "Want to Read"
      case 'read': return "Read"
      default: return "Bad Shelf Name"
    }
  }

  render() {
    const { children, shelf } = this.props
    return (
      <div className="bookshelf">
        <ShelfName value={ this.readyShelfNamesForPrint(shelf) }/>
        <div className="list-books-content">
          <ol className="books-grid">
          {children}
          </ol>
        </div>
      </div>
    )
  }
}

export default ListShelves
