import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'
import {Book, Selector} from './App'

export default class Search extends Component {
  initialState={
    query: '',
    results: [],
    owned: this.props.books,
    loading: false
  }

  state={
    query: '',
    results: [],
    owned: this.props.books,
    loading: false
  }

  runSearch = (query) => {
    this.loading(true)
    if(query.length === 0) this.clearState()
    else {
      this.setState({ query: query })
      this.search(this.state.query)
    }
    // this.clearState()
    // this.loading(false)
  }

  search = (query) => {
    this.splitQuery(query).map( word => BooksAPI.search( word )
      .then( this.checkPreviousResults )
      .then( this.removeDuplicates )
      .then( this.mergeBooks )
      .then( this.putResults )
      .catch( err => {
        console.log("err: "+err)
        this.loading(false)
      })
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
    return resp.map( item => {
      let match = this.state.owned.find( myBook => myBook.id === item.id)
      return match ? match : item
    })
  }

  putResults = (results = []) => {
    this.setState({ results: results })
    this.loading(false)
  }

  clearState = () => {
    this.setState({...this.initialState })
  }
  loading = (value) => {
    this.setState({ loading: value })
  }

  render(){
    const { query }= this.state
    //
    // const he = new Promise(function(resolve, reject) {
    //
    // });
    if(query.length === 0 && this.state.results.length > 0) this.clearState()
    return (
      <div className="search">
        <SearchBar query={query} onFormChange={this.runSearch}/>
        {console.log(this.state)}
        <div className="search-books-results">
          <ol className="books-grid">
            <SearchResults state={this.state} />
          </ol>
        </div>
      </div>
    )
  }
}

const SearchResults = props => {
  const { query, results, loading }= props.state

  if (loading) return <div>Loading...</div>
  else if (query !== '' && results.length === 0) {
    return <div>Sorry, no books found with {query}!</div>
  } else return <Results state={props.state} />
}

const Sorry = props => {
  if(props.state.query !== '' && !props.state.loading) {
    return <div>Sorry, no books found with that search query!</div>
  } else if (props.state.loading) return <div>Loading</div>
  else return <div></div>
}

const Results = props => {
    return props.state.results.map( book =>
      <Book book={book} key={book.id} shelf={null}>
        <Selector book={book} shelf={book.shelf} {...props}/>
      </Book>
    )
}


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
