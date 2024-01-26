import React, { useState } from 'react'
import { MailOutlined } from '@mui/icons-material'
import { Person } from '@mui/icons-material'
import { LockOutlined } from '@mui/icons-material'
import { LockOpen } from '@mui/icons-material'

export const SignupLogin = () => {

  const [action, setAction] =useState("Login");

  return (
    <div className='login-container'>
      <div className='login-header'>
        <div className='text'>{action}</div>
        <div className='underline'></div>
      </div>
      <div className='inputs'>
        {action==="Login"?<div></div>:<div className='input'>
        <div className='icons'><Person/></div> 
          <input type ="text" placeholder='first name'/>
        </div>}
        {action==="Login"?<div></div>:<div className='input'>
        <div className='icons'><Person/></div>
          <input type ="text" placeholder='surname'/>
          </div> }
        
        <div className='input'>
          <div className='icons'><MailOutlined/></div>
          <input type ="email" placeholder='email'/>
        </div>
        <div className='input'>
        <div className='icons'><LockOutlined/></div>
          <input type ="password" placeholder='password'/>
        </div>
        {action==="Login"?<div></div>:<div className='input'>
        <div className='icons'><LockOpen/></div>
          <input type ="password" placeholder='confirm password'/>
        </div>}
        
        {action==="Sign Up"?<div></div>:<div className='forgot-password'>forgotten password? <span>click here!</span></div>}
        
        <div className='submit-container'>
          <div className={action==="Login"?"submit gray":"submit"}onClick={()=>{setAction("Sign Up")}}>Sign Up</div>
          <div className={action==="Sign Up"?"submit gray":"submit"}onClick={()=>{setAction("Login")}}>Login</div>
        </div>
      </div>
    </div>
  )
}

export default SignupLogin