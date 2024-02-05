import React from 'react'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import FullscreenExitOutlinedIcon from '@mui/icons-material/FullscreenExitOutlined';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ListIcon from '@mui/icons-material/List';
// import admin from '../Images/admin.jpg'

const AdminnavBar = () => {
  return (
    <div className='admin-navbar'>
      <div className='wrapper'>
        <div className='search'>
          <input type='text' placeholder='search here...'/>
          <SearchOutlinedIcon className='icons'/>
        </div>
        <div className='items'>
          <div className='item'>
            <DarkModeOutlinedIcon className='icons'/>
          </div>
          <div className='item'>
            <FullscreenExitOutlinedIcon className='icons'/>
          </div>
          <div className='item'>
            <NotificationsNoneIcon className='icons'/>
            <div className='counter'>3</div>
          </div>
          <div className='item'>
            <ChatBubbleOutlineIcon className='icons'/>
            <div className='counter'>10</div>
          </div>
          <div className='item'>
            <ListIcon className='icons'/>
          </div>
          {/* <div className='item'>
            <img
            src={admin}
            alt=""
            className='admin-pic'/>
            
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default AdminnavBar