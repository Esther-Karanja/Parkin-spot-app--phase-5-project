import {React, useEffect, useState} from 'react'
import AdminSidebar from './AdminSidebar'
import AdminnavBar from './AdminnavBar'
import { DataGrid, GridColDef,} from '@mui/x-data-grid';
import {Box, IconButton, Tooltip} from '@mui/material';
import {Edit} from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';

const ParkingSpots = () => {

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

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID'},
    { field: 'capacity', headerName: 'Capacity'},
    { field: 'latitude', headerName: 'Latitude'},
    {field: 'location', headerName: 'Location'},
    {field: 'pricing', headerName: 'Pricing'},
    {field: 'type', headerName: 'Type'},
    {
      field: 'restrictions', 
      headerName: 'Restrictions',
      renderCell:(params)=>{
        return(
          <div className={`cellWithrestrictions ${params.row.restrictions}`}>{params.row.restrictions}</div>
        )
      }
    },
    
  ];

  useEffect(()=>{
    fetch("http://127.0.0.1:5000/parking")
    .then(resp=>resp.json())
    .then(resp=>{
      console.log(resp)
      setRows(resp)})
  },[])
  return (
    <div className='admin-parkingspots'>
      <AdminSidebar/>
      <div className='parkingscontainer'>
        <AdminnavBar/>
        <div className='parkingspotstable'>
        <DataGrid
        rows={rows}
        columns={columns.concat(actionColumn)}
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

export default ParkingSpots