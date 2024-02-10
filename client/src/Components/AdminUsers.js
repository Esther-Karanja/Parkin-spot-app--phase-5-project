import {React, useEffect, useState} from 'react'
import AdminSidebar from './AdminSidebar'
import AdminnavBar from './AdminnavBar'
import {DataGrid} from '@mui/x-data-grid';
import {Box, IconButton, Tooltip} from '@mui/material'
import {Edit} from '@mui/icons-material'
import DeleteIcon from '@mui/icons-material/Delete';


const AdminUsers = () => {
  const actionColumn =[{field: "action", headerName: "Action", width: 200, renderCell:()=>{
    return(
      <Box>
       <Tooltip title='Edit'>
           <IconButton onClick={()=>{}}>
               <Edit/>
           </IconButton>
       </Tooltip>
       <Tooltip title='Delete'>
           <IconButton onClick={()=>{}}>
               <DeleteIcon/>
           </IconButton>
       </Tooltip>
   </Box>
    )
  }}]

  const [rows, setRows]= useState([])

  const columns= [
    { field: 'id', headerName: 'ID'},
    { field: 'firstname', headerName: 'Firstname'},
    { field: 'surname', headerName: 'Surname'},
    {field: 'email', headerName: 'Email'},
    {field: 'password', headerName: 'Password'},
    {field: '_is_activated', headerName: '_Is_Activated'},
    {field: 'phone', headerName: 'Phone'},
    {field: 'role', headerName: 'Role'},
    
  ];

  useEffect(()=>{
    fetch("http://127.0.0.1:5000/users")
    .then(resp=>resp.json())
    .then(resp=>{
      console.log(resp)
      setRows(resp)})
  },[])
  return (
    <div className='admin-users'>
      <AdminSidebar/>
      <div className='usersscontainer'>
        <AdminnavBar/>
        <div className='usersstable'>
        <DataGrid
        rows={rows}
        columns={columns.concat(actionColumn)}
        options={{
          search:true,
          filtering:true,
          exportButton:true
        }}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        rowsPerPageOptions={[5]}
        pageSizeOptions={[5,10, 15, 20, 25, 30]}
        checkboxSelection
        getRowId={(row) => row.id}
      />
        </div>
      </div>
    </div>
  )
}

export default AdminUsers