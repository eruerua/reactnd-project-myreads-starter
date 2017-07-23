import React from 'react'
import { Link } from 'react-router-dom'
import serializeForm from 'form-serialize'
import './App.css'
class Register extends React.Component {

  register(email,password) {
    self=this
      this.props.user.auth().createUserWithEmailAndPassword(email, password).then(function(user) {
          // 获取用户
          // user.sendEmailVerification();
          alert('注册成功，按确认跳转到书架')
          self.props.back()
      }).catch(function(error) {
          // 错误处理
          alert(error);
      });
  }

  handleSubmit = (e)=>{
    e.preventDefault()
    const values=serializeForm(e.target,{hash:true})
    console.log(values)
    this.register(values.email,values.password)
  }

  render(){
    return(
      <div>
      <Link className='close-register' to='/'>Close</Link>
      <form onSubmit={this.handleSubmit} className='register-form'>
        <div className='register-details'>
          <input type='text' name='email' placeholder='Email' />
          <input type='password' name='password' placeholder='Password' />
          <button>注册</button>
        </div>
      </form>
      </div>
    )
  }
}
export default Register
