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
    this.setState({ query: query })
  }

  searchQuery = (query) => {
    this.updateStateQuery(query)
    // split words by space
    let words = query.split(' ')
    // remove multiple spaces if there are any
    words = words.filter( word => word !== '' )
    if (query !== ''){
      // search each word
      words.forEach( word => {
        BooksAPI.search(word).then( response => {
            response.error ? this.clearResults() : this.updateResults(response)
        })
      })
    }

    // old version
    // if (query !== ''){
    //   BooksAPI.search(query).then( response => {
    //     response.error ? this.clearResults() :
    //       this.setState({ results: response })
    //   })
    // } else {
    //   this.clearResults()
    // }
  }

  updateResults = (resp) => {
    let resultsArray = []
    resp && resp.map( book => resultsArray.push(book))
    const results = [...new Set(resultsArray)]
    this.setState(state => state.results = results)

  }
  clearResults = () => {
    this.setState({ results: [] })
  }

  render(){
    const {query, results}= this.state
    // const {moveBook, shelfNames} = this.props
    // let showingBooks = false
    // results.length !== 0 && (showingBooks = results)

    // (query === '' && results.length !== 0) ? clearResults() :

    return (
      <div className="search">
        <SearchBar query={query} onFormChange={this.searchQuery}/>
        {console.log(this.state)}
        <div className="search-books-results">
          <ol className="books-grid">
          { query !== '' && results.length === 0 ? <Sorry /> :
              results.map( book =>
                <Book book={book} key={book.id} shelf={null}>
                  <Selector book={book} {...this.props}/>
                </Book>
              )
            }
          </ol>
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
