import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'

import Book from './ListShelves'
// import escapeRegExp from 'escape-string-regexp'
// import sortBy from 'sort-by'

export default class Search extends Component {
  state={
    query: '',
    results: []
  }

  updateStateQuery = (query) => {
    this.setState({ query: query.trim() })
    this.searchQuery(query)
  }

  searchQuery = (query) => {
   // query && BooksAPI.search(query).then(books => JSON.stringify(books))
   //  .then(books =>
   //    this.setState( state=> state.results = books)
   //  )
    query && BooksAPI.search(query).then(books =>
       this.setState( state=> state.results = books)
     )
  }
//


  render(){
    const {query,results}= this.state
    const {myBooks, onShelfChange, shelfNames  } = this.props
    return (
      <div>
        <SearchBar queryVisual={query} onValueChange={this.updateStateQuery}/>
        <SearchResults items={results} onShelfChange={this.props.onShelfChange}/>

      </div>
  )}
}


const SearchBar = props =>
  <div className="search-books-bar">
    <div className="search-books-input-wrapper">
      <input
        className='search-books'
        type='text'
        placeholder='Search books'
        value={ props.queryVisual }
        onChange={(event) => props.onValueChange(event.target.value)}
      />
      </div>
    <Link to="/" className="close-search"/>
  </div>

const SearchResults = props =>
      <div className="search-books-results">
      {console.log(props)}
        {props.items.error ? <div>Sorry</div> :
          props.items.map( book =>
            <Book book={book} key={book.id}
                moveBook={props.onShelfChange}
                shelf={book.shelf} shelfList={props.shelfNames}/>
        )}
      </div>


  /*

   */
