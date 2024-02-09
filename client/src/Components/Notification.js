import React, { useState } from 'react'
import { MailOutlined } from '@mui/icons-material'
import { Person } from '@mui/icons-material'
import { LockOutlined } from '@mui/icons-material'
import { LockOpen } from '@mui/icons-material'

const ErrorNotification=({msg})=>{
    return (
        <div class="alert alert-danger" role="alert">
          {msg}
        </div>
    )
    
}

const SuccessNotification=({msg})=>{
    return (
        <div class="alert alert-success" role="alert">
          {msg}
        </div>
    )
    
}

const Notification = ({status, msg}) => {
    if(status === 'error') return <ErrorNotification msg={msg}/>

    if(status === 'success') return <SuccessNotification msg={msg}/>

}  
export default Notification