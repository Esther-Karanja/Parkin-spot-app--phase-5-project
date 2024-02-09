import React, { useState } from 'react'
import logo from '../Images/logo.png'
import {HiOutlineBars3} from "react-icons/hi2";
import HomeIcon from "@mui/icons-material/Home"
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InfoIcon from "@mui/icons-material/Info"
import ReviewsIcon  from '@mui/icons-material/Reviews';
import LoginIcon  from '@mui/icons-material/Login';
import AppRegistrationIcon from "@mui/icons-material/AppRegistration"
import AdminPanelIcon from "@mui/icons-material/AdminPanelSettings"
import HailIcon from '@mui/icons-material/Hail';

import { Link } from 'react-router-dom';



const Navbar = () => {
    const [role, setRole] = useState(localStorage.getItem('role'))
    console.log (role)

    const [openMenu, setOpenMenu] = useState(false)
    const menuOptions =[
        {
            text: "Home",
            icon: <Link to='/'><HomeIcon/></Link>
        },
        {
            text: "How it works",
            icon: <Link to='/how-it-works'><InfoIcon/></Link>
        },
        {
            text: "Reviews",
            icon: <Link to='/reviews'><ReviewsIcon/></Link>
        },
        {
            text: "Login",
            icon: <Link to='/login'><LoginIcon/></Link>
        },
        {
            text: "Sign Up", 
            icon: <Link to='/signup'><AppRegistrationIcon/></Link>
        },
        
        {
            text: "Booking", 
            icon: <Link to='/Booking'><HailIcon/></Link>
        },
        
         role === "admin" && {
            text: "Admin Panel",
            icon: <Link to='/admin'><AdminPanelIcon/></Link>
        },
       
    ]

  return (
    <nav>
        <div className='nav-logo-container'>
            <img src={logo} alt=''/>
        </div>
        <div className='navbar-links-container'>
            <ul>
                <li>
                    <Link to='/'>Home</Link>
                </li>
                <li>
                <Link to='/how-it-works'>How it works</Link>
                </li>
                <li>
                    <Link to='/reviews'>Reviews</Link>
                </li>
                <li>
                    <Link to='/signup'>Sign-Up</Link>
                </li>

                <li>
                    <Link to='/login'>Login</Link>
                </li>
          
                 <li>
                    <Link to='/Booking'>Booking page</Link>
                </li> 


                <li>
                    {role === "admin" &&<Link to='/admin'>Admin Panel</Link>}
                </li>
            </ul>
        </div>
        <div className='navbar-menu-container'>
            <HiOutlineBars3 onClick={() =>setOpenMenu(true)} />
        </div>
        <Drawer open={openMenu} onClose ={()=> setOpenMenu(false)}
        anchor="right">
            <Box
            sx={{width:250}}
            role="presentation"
            onClick={()=> setOpenMenu(false)}
            onKeyDown={() => setOpenMenu(false)}
            >
                <List>
                    {menuOptions.map((item)=>(
                        <ListItem key={item.text} disablePadding>
                            <ListItemButton>
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.text}/>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>   
            </Box>
        </Drawer>




    </nav>
  )
}

export default Navbar