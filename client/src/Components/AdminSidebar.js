import React from 'react'
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import PersonIcon from '@mui/icons-material/Person';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import ReviewsIcon from '@mui/icons-material/Reviews';
import TimelineIcon from '@mui/icons-material/Timeline';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LogoutIcon from '@mui/icons-material/Logout';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeIcon from '@mui/icons-material/DarkMode';

const AdminSidebar = () => {
  return (
    <div className='sidebar'>
        <div className='top'>
            <span className='admin-logo'>Admin</span>
        </div>
        <hr/>
        <div className='center'>
            <ul>
                <p className='title'>MAIN</p>
                <li>
                    <DashboardCustomizeIcon className='icons'/>
                    <span>Dashboard</span>
                </li>
                <p className='title'>LISTS</p>
                <li>
                    <PersonIcon className='icons'/>
                    <span>Users</span>
                </li>
                <li>
                    <DirectionsCarIcon className='icons'/>
                    <span>Parking Spots</span>
                </li>
                <li>
                    <ReviewsIcon className='icons'/>
                    <span>Reviews</span>
                </li>
                <p className='title'>USEFUL LINKS</p>
                <li>
                    <NotificationsNoneIcon className='icons'/>
                    <span>Notifications</span>
                </li>
                <li>
                    <TimelineIcon className='icons'/>
                    <span>Statistics</span>
                </li>
                <p className='title'>SYSTEM</p>
                <li>
                    <SettingsIcon className='icons'/>
                    <span>Settings</span>
                </li>
                <p className='title'>USER INFO</p>
                <li>
                    <AccountBoxIcon className='icons'/>
                    <span>Profile</span>
                </li>
                <li>
                    <LogoutIcon className='icons'/>
                    <span>Logout</span>
                </li>
            </ul>
        </div>
        <p className='title'>USER MODE</p>
        <div className='bottom'>
            <div className='usermode'><LightModeOutlinedIcon/></div>
            <div className='usermode'><DarkModeIcon/></div>
        </div>
    </div>
  )
}

export default AdminSidebar