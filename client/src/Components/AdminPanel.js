import React from 'react'
import AdminSidebar from './AdminSidebar'
import AdminnavBar from './AdminnavBar';
import Widget from './Widget';
// import Adminlogin from './Adminlogin'
// import { Link, Outlet } from "react-router-dom";

const AdminPanel = () => {
  return (
    <div className="home">
        <AdminSidebar/>
        <div className='home-container'>
          <AdminnavBar/>
          <div className='widgets'>
            <Widget type="user"/>
            <Widget type="all parking spots"/>
            <Widget type="booked parking spots"/>
            <Widget type="available parking spots"/>
          </div>
          </div>
      </div>
  );
}

export default AdminPanel