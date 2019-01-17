import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'
import { Selector } from './App'
import { SearchResults } from './SearchResults'
import Book from './Book'

export default class Search extends Component {
  initialState={
    query: '',
    results: [],
    owned: this.props.books, // why do I need this?
    loading: false
  }
  // remove this and maybe
  state={
    query: '',
    results: [],
    loading: false
  }

  splitQuery = (query) => {
    let words = query.split(' ')
    words = words.filter( word => word !== '' ) // extra spaces from query
    return words
  }

  // search = ( query = this.state.query ) => {
  //   console.log(query)
  //     this.splitQuery(query).map ( (word, index, words) =>
  //         BooksAPI.search( word )
  // .then( re => this.mergeResults( re, index ))
  // .then( this.removeDuplicates, this.putResults() )
  // .then( this.mergeBooks )
  // .then( this.putResults )
  // .catch( err => {
    //     console.log("err: "+err)
    //     this.putResults()
    //   })

  mergeResults = (resp, index) => {
    // if this is the second word return combined results
    return !index ? resp : [...this.state.results, ...resp] //.filter( item => item ) // filters undefined items
  }

  removeDuplicates = (resp) => {
    // creates an array of unique book ids
    // scans the response and gets first element with that id
    // and returns that array, ultimately removing duplicates
      return [...new Set(resp.map(b => b.id))].map( id => resp.find( book => book.id === id ))
  }

  mergeBooks = (resp) => {
    return resp.map( item => {
      let match = this.state.owned.find( myBook => myBook.id === item.id)
      return match ? match : item
    })
  }

  putResults = (results = [], loading = false) => {
    this.setState({ results: results, loading: loading })
  }

  resetState = () => {
    this.setState({...this.initialState })
  }


  search = ( query = this.state.query ) => {
    this.splitQuery(query).map ( (word, index, words) =>
      BooksAPI.search( word )
        .then( re => this.manageShowingBooks( re, index ))
      )
    }

  manageShowingBooks = (re, index) => {
    const showingBooks = this.mergeBooks(this.removeDuplicates(this.mergeResults(re, index)))
    this.putResults(showingBooks)
  }

//
// const Sorry = props => {
//   if(props.state.query !== '' && !props.state.loading) {
//     return <div>Sorry, no books found with that search query!</div>
//   }else if (props.state.loading) {
//     return <div>Loading...</div>
//   }else return <div></div>
// }
