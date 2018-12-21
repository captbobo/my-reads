import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'
import {Book, Selector} from './App'

export default class Search extends Component {
  state={
    query: '',
    results: []
  }

  runSearch = (query) => {
    // this.clearResults()
    this.search(query)
    this.setState({ query: query, owned: this.props.books, results: [] })
  }

  search = (query) => {
    this.splitQuery(query).map( word => BooksAPI.search( word )
      .then( this.checkPreviousResults )
      .then( this.removeDuplicates )
      .then( this.mergeBooks)
      .then( this.putResults )
      .catch( err => console.log("err: "+err))
    )
  }

  splitQuery = (query) => {
    let words = query.split(' ')
    words = words.filter( word => word !== '' ) // remove extra spaces if any
    return words
  }

  checkPreviousResults = (resp) => {
      return this.state.results.length ? [...this.state.results, ...resp].filter( item => item ) : [...resp]
  }

  removeDuplicates = (resp) => {
      return [...new Set(resp.map(b => b.id))].map( id => resp.find( book => book.id === id ))
  }

  mergeBooks = (resp) => {
    console.log(resp)
    return resp.map( item => {
      let match = this.state.owned.find( myBook => myBook.id === item.id)
      return match ? match : item
    })
  }

  putResults = (results = []) => {
    console.log(results)
    this.setState({ results: results })
  }

  // clearResults = () => {
  //   this.setState(state =>  state.results = [] )
  // }

  render(){
    const {query, results}= this.state
    return (
      <div className="search">
        <SearchBar query={query} onFormChange={this.runSearch}/>
        {console.log(this.state)}
        <div className="search-books-results">
          <ol className="books-grid">
          { query !== '' && results.length === 0 ? <Sorry /> :
              results.map( book =>
                <Book book={book} key={book.id} shelf={null}>
                  <Selector book={book} shelf={book.shelf} {...this.props}/>
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
