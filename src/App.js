import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchBook from './searchBook'
import Book from './book'
import ShowBook from './showBook'
import Register from './register'
import Login from './login'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
var Wilddog = require("wilddog");

class BooksApp extends React.Component {
    state = {
      //three shelfs to show
      shelfs: ['currentlyReading', 'wantToRead', 'read'],
      books: [],
      user:{},
      ref:{}
    }
    componentWillMount() {
      let config = {
          authDomain: "danmu-hh.wilddog.com/",
          syncURL: "https://danmu-hh.wilddogio.com/"
      };
      Wilddog.initializeApp(config)
      this.setState({
        user:Wilddog
      })
    }
    //get books information from server
    componentDidMount() {
      // this.state.ref.child('allbooks').on('value', function(snapshot){
      //   console.log(snapshot.val())
      // })
      // BooksAPI.getAll().then((books) => {
      //   console.log('books', books);
      //   this.setState({
      //     books:books
      //   })
      // })
    }
    //update shelf information when change book's shelf
    update = (e, c) => {
      console.log(e,c)
      BooksAPI.update(c, e).then((reponse)=>{
        console.log(reponse)
      })
      let books = this.state.books;
      books.map(book => {
        (book.id === c.id) && (book.shelf = e)
      });
      console.log(books)
      this.setState({
        books: books
      })
      c.shelf=e
      this.state.ref.child('allbooks').child(c.id).update(c)
    }
    //if book exist on shelf,then use update,neither add search book to shelf
    add = (e, c) => {
      console.log(e,c)
      if(c.shelf!=='none'){
        this.update(e,c)
      }else{
        BooksAPI.update(c, e).then((reponse)=>{
          console.log(reponse)
        })
        console.log(c, e)
        c.shelf = e;
        console.log(this.state.books);
        this.setState({
          books: this.state.books.concat(c)
        })
        this.state.ref.child('allbooks').child(c.id).update(c)
        console.log(this.state.ref.child('allbooks'))
        alert('Add Complete!')
        console.log(this.state.books);
      }
    }

    refUser=(ref,bookList)=>{
      this.setState({
        ref:ref,
        books:bookList
      })
    }

    render() {
      console.log(this.refUser)
      console.log(this.state.ref)
      console.log(this.state.books)
      return (
        <div className="app">
        <Route path='/search' render={() =>
          (<SearchBook books={this.state.books} update={this.add}/>)}/>
        <Route exact path='/' render={
            () =>
            (<ShowBook shelfs={this.state.shelfs} books={this.state.books} update={this.update}/>)
      }/>
      <Route path='/register' render={({history})=>(<Register user={this.state.user} back={()=>{history.push('/')}}/>)}/>
      <Route path='/login' render={({history})=>(<Login user={this.state.user} refs={(ref,bookList)=>{
        this.refUser(ref,bookList)
        history.push('/')
      }}/>)}/>

      </div>)
    }
  }
    export default BooksApp
