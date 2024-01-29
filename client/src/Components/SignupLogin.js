import React, { useState } from 'react'
import { MailOutlined } from '@mui/icons-material'
import { Person } from '@mui/icons-material'
import { LockOutlined } from '@mui/icons-material'
import { LockOpen } from '@mui/icons-material'



const Notification = ({status, msg}) => {
  return (
    <div style={{color: status === 'success' ? 'green' : 'red', backgroundColor: status === 'success' ? 'lightgreen' : 'lightcoral', padding: '10px', borderRadius: '5px'}}>
      <div className="text">{status}</div>
      <div className="text">{msg}</div>
    </div>
  )
}

export const SignupLogin = () => {

  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const [firstname, setFirstname] = useState();
  const [surname, setSurname] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [action, setAction] =useState("Login");

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
      }
    })

  }
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
      }
    })


    
  }

  return (
    <div className='login-container'>
      {notification.status && <Notification status={notification.status} msg={notification.msg}/>}
      <div className='login-header'>
        <div className='text'>{action}</div>
        <div className='underline'></div>
      </div>
      <div className='inputs'>
        {action==="Login"?<div></div>:<div className='input'>
        <div className='icons'><Person/></div> 
          <input type ="text" placeholder='first name' onChange={(e)=>{setFirstname(e.target.value)}}/>
        </div>}
        {action==="Login"?<div></div>:<div className='input'>
        <div className='icons'><Person/></div>
          <input type ="text" placeholder='surname' onChange={(e)=>{setSurname(e.target.value)}}/>
          </div> }
        
        <div className='input'>
          <div className='icons'><MailOutlined/></div>
          <input type ="email" placeholder='email' onChange={(e)=>{setEmail(e.target.value)}}/>
        </div>
        <div className='input'>
        <div className='icons'><LockOutlined/></div>
          <input type ="password" placeholder='password' onChange={(e)=>{setPassword(e.target.value)}}/>
        </div>
        {action==="Login"?<div></div>:<div className='input'>
        <div className='icons'><LockOpen/></div>
          <input type ="password" placeholder='confirm password' onChange={(e)=>{setConfirmPassword(e.target.value)}}/>
        </div>}
        
        {action==="Sign Up"?<div></div>:<div className='forgot-password'>forgotten password? <span>click here!</span></div>}
        
        <div className='submit-container'>
          <div className={action==="Login"?"submit gray":"submit"}onClick={()=>{setAction("Sign Up")}}>Sign Up</div>

          <div className={action==="Sign Up"?"submit gray":"submit"}onClick={()=>{setAction("Login")}}>Login</div>


        </div>
        {action==="Sign Up"? <div className={"submit gray"}onClick={signup}>Submit</div>:
          <div className={"submit gray"}onClick={login}>Submit</div>}

      </div>
    </div>
  )
}

export default SignupLogin