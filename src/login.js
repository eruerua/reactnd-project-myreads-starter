import React from 'react'
import { Link } from 'react-router-dom'
import serializeForm from 'form-serialize'
import './App.css'
class Login extends React.Component {

  login(email,password) {
      let uid,ref
      self=this
      console.log(this.props)
      this.props.user.auth().signInWithEmailAndPassword(email, password).then(function(user) {
          // 获取用户
          console.log(user);
          uid = self.props.user.auth().currentUser.uid;
          ref = self.props.user.sync().ref("books/" + uid);
          ref.child('allbooks').once('value', function(snapshot){
            let bookObject = snapshot.val()
            let bookList=[]
            for(let key in bookObject){
              bookList.push(bookObject[key])
            }
            self.props.refs(ref,bookList);
          })

      }).catch(function(error) {
          // 错误处理
          console.log(error);
      });
  }

  handleSubmit = (e)=>{
    e.preventDefault()
    const values=serializeForm(e.target,{hash:true})
    console.log(values)
    this.login(values.email,values.password)
  }

  render(){
    return(
      <div>
      <Link className='close-login' to='/'>Close</Link>
      <form onSubmit={this.handleSubmit} className='login-form'>
        <div className='login-details'>
          <input type='text' name='email' placeholder='Email' />
          <input type='password' name='password' placeholder='password' />
          <button>Log In</button>
        </div>
      </form>
      </div>
    )
  }
}
export default Login
