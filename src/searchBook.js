import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'
import './App.css'
import Book from './book'
//serach book component,the default of  books in this component is 'none'
class SearchBook extends Component{
  state = {
    result:[]
  }
//serach function
  updateQuery = (event) => {
    self=this;
    let query=event.target.value;
    let key=event.keyCode;
    console.log(query,key)
    if (query&&key===13) {
      BooksAPI.search(query,function(books){
        console.log('callback')
        console.log(self)
        if (books.length) {
          books.map(book=>{
            book.shelf='none'
            self.props.books.map(shelfBook=>{
              if(book.id==shelfBook.id){
                book.shelf=shelfBook.shelf
              }
            })

          })
          self.setState({
            result: books
          })
          console.log(self.state.result)
        } else {
          self.setState({
            result: []
          })
        }
      })
    } else {
      this.setState({
        result: []
      })
    }
  }
  render(){
    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/home' className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" onKeyDown={(event) => this.updateQuery(event)}/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.result.length>0&&this.state.result.map((book)=>(
              <Book
                shelf={book.shelf}
                key={book.id}
                updateShelfDate={this.props.update}
                info={book}
              />
            ))}
          </ol>
        </div>
      </div>
    )
  }
}
export default SearchBook
