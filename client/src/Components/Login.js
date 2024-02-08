import React, { useState } from 'react'
import { MailOutlined } from '@mui/icons-material'
import { Person } from '@mui/icons-material'
import { LockOutlined } from '@mui/icons-material'
import { LockOpen } from '@mui/icons-material'
import Notification from './Notification'

export const Login = () => {

  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const [notification, setNotification] = useState({status: '', msg: ''})

  const login = () => {
    fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email, password})
    }) 
    .then(res => res.json())
    .then(data => {
      console.log(data)
      if(data.status === 'error'){
        setNotification({status: 'error', msg: data.msg})
      }else{
        setNotification({status: 'success', msg: data.msg})
        const token = data.token
        const role = data.role
        localStorage.setItem('token', token)
        localStorage.setItem('role', role)
        window.location.href = '/'
      }
    })

  }

  return (
    <div className='login-container'>
      <div className='login-header'>
        <div className='text'>{"Login"}</div>
        <div className='underline'></div>

        {notification.status && <Notification status={notification.status} msg={notification.msg}/>}


      </div>
      <div className='inputs'>
        
        <div className='input'>
          <div className='icons'><MailOutlined/></div>
          <input type ="email" placeholder='email' onChange={(e)=>{setEmail(e.target.value)}}/>
        </div>
        <div className='input'>
        <div className='icons'><LockOutlined/></div>
          <input type ="password" placeholder='password' onChange={(e)=>{setPassword(e.target.value)}}/>
        </div>
        
        <div className='forgot-password'>forgotten password? <span>click here!</span></div>

        
        <div className='submit-container'>
        <div className={"submit gray"}onClick={login}>Submit</div>





        </div>
      </div>
    </div>
  )
}

export default Login