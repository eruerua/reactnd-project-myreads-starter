import React from 'react'
import { Link } from 'react-router-dom'
import serializeForm from 'form-serialize'
import './App.css'
import forReading from './icons/forReading.jpeg'

class MainPage extends React.Component {
  render(){
    return(
      <div className='main-page'>
          <div className='main-page-title'>
            <h2>
              <Link to='/login'>登录</Link>
            </h2>
            <h2>
              <Link to='/register'>注册</Link>
            </h2>
          </div>
          <img className="main-pic" src={forReading} alt={'pic'}/>
          <h2 className='text-center'>读书，是为了遮眼睛</h2>
          <h4 className='text-center'>
            ----<a href="http://paulsin.blogspot.com/" target="_blank">「狂人日记」</a>Paul Sin
          </h4>
          <h4>
            注册后登录，在我的书架页面可以按右下角+图标来添加书籍，可以添加到currentReading（正在读），wantRead（想读）和Read（读过）三个不同的书架上
          </h4>
      </div>
    )
  }
}
export default MainPage
