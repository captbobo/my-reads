import React, { Component } from 'react'

const ShelfHeader = (props) => {
  return (
    <div className="bookshelf-header">
      <h2 className="bookshelf-title">{props.value}</h2>
    </div>
  )
}

class ListShelf extends Component {
// children: books for the respective shelf
  render() {
    const { children, shelf } = this.props
    return (
      <div className="bookshelf">
        <ShelfHeader value={ shelf }/>
        <div className="list-books-content">
          <ol className="books-grid">
          {children}
          </ol>
        </div>
      </div>
    )
  }
}

export default ListShelf
