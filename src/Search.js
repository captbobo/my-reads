import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'
import {Book, Selector} from './App'

// import escapeRegExp from 'escape-string-regexp'
// import sortBy from 'sort-by'

export default class Search extends Component {
  state={
    query: '',
    results: []
  }

  updateStateQuery = (query) => {
    this.setState({ query: query.trim() })
  }

  searchQuery = (query) => {
    query &&
      this.updateStateQuery(query)
      BooksAPI.search(query).then( books => this.setState({ results: books }))
    }

  render(){
    const {query, results}= this.state
    // const {moveBook, shelfNames} = this.props
    return (
      <div className="search">
        <SearchBar query={query} onFormChange={this.searchQuery}/>
        {console.log(this.state)}
        <div className="search-books-results">
          {results.error && results.length !== 0 ? <Sorry /> :
            <ListBooksGrid> {results.map( book =>
              <Book book={book} key={book.id}
                  shelf={null}>
                <Selector {...this.props}/>
              </Book> }
            </ListBooksGrid>
            )}
        </div>
      </div>
    )
  }
}

const Sorry = props =>
    <div>Sorry, no books found with that search query!</div>

const SearchBar = props =>
  <div className="search-books-bar">
    <div className="search-books-input-wrapper">
      <input
        className='search-books'
        type='text'
        placeholder='Search books'
        value={ props.query }
        onChange={(event) => props.onFormChange(event.target.value)}
      />
      </div>
    <Link to="/" className="close-search"/>
  </div>
