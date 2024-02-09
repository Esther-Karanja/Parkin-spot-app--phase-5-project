import React, { useState } from 'react'
import { MailOutlined } from '@mui/icons-material'
import { Person } from '@mui/icons-material'
import { LockOutlined } from '@mui/icons-material'
import { LockOpen } from '@mui/icons-material'
import Notification from './Notification'




export const Signup = () => {

  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const [firstname, setFirstname] = useState();
  const [surname, setSurname] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const [notification, setNotification] = useState({status: '', msg: ''})

  const signup = () => {
    fetch('http://localhost:5000/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({firstname, surname, email, password})
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      if(data.status === 'error'){
        setNotification({status: 'error', msg: data.msg})
      }else{
        setNotification({status: 'success', msg: data.msg})
        window.location.href = '/login'
      }
    })


    
  }

  return (
    <div className='login-container'>
      <div className='login-header'>
        <div className='text'>{'Signup'}</div>
        <div className='underline'></div>
        {notification.status && <Notification status={notification.status} msg={notification.msg}/>}

      </div>
      <div className='inputs'>
        <div className='input'>
        <div className='icons'><Person/></div> 
          <input type ="text" placeholder='first name' onChange={(e)=>{setFirstname(e.target.value)}}/>
        </div>
        <div className='input'>
        <div className='icons'><Person/></div>
          <input type ="text" placeholder='surname' onChange={(e)=>{setSurname(e.target.value)}}/>
          </div>
        
        <div className='input'>
          <div className='icons'><MailOutlined/></div>
          <input type ="email" placeholder='email' onChange={(e)=>{setEmail(e.target.value)}}/>
        </div>
        <div className='input'>
        <div className='icons'><LockOutlined/></div>
          <input type ="password" placeholder='password' onChange={(e)=>{setPassword(e.target.value)}}/>
        </div>
        <div className='input'>
        <div className='icons'><LockOpen/></div>
          <input type ="password" placeholder='confirm password' onChange={(e)=>{setConfirmPassword(e.target.value)}}/>
        </div>

        
        
        <div className='submit-container'>


        <button className='submit' onClick={signup}>Signup</button>


        </div>


      </div>
    </div>
  )
}

export default Signup