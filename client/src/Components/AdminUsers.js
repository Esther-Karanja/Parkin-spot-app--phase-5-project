import {React, useEffect, useState} from 'react'
import AdminSidebar from './AdminSidebar'
import AdminnavBar from './AdminnavBar'
import {GridRowModes,  DataGrid, GridRowEditStopReasons} from '@mui/x-data-grid';
import {Box, IconButton, Tooltip} from '@mui/material'
import { Edit} from '@mui/icons-material'
import DeleteIcon from '@mui/icons-material/Delete'
import SaveIcon from '@mui/icons-material/Save'
import CancelIcon from '@mui/icons-material/Close'


const AdminUsers = () => {
  const [editRowId, setEditRowId] = useState(null)
  const [rows, setRows]= useState([])
  const [rowModesModel, setRowModesModel] = useState({})

  const handleEditClick = (id) => {
    setEditRowId(id)
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } })
  }

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true
    }
  }

  const handleSaveClick = (id) => () => {
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.View },
    }))
  }

  const handleCancelClick = (id) => () => {
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    }))
  }

  const handleUpdate = (newRow) => {
    
    const newRole = {
      role: newRow.role
    }
    console.log(newRole)
    fetch(`http://localhost:5000/update-user/${editRowId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newRole)
    })
      .then((r) => r.json())
      .then((response) => {
        if (response.status === "success") {
          const updatedRow = { ...newRow, isNew: false }
          setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)))
          console.log("User updated successfully.")
      } else {
        console.error("Failed to update user.")
      }
    })
    .catch((error) => {
      console.error("Error occurred while updating user:", error)
    })
    return newRow
  }

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel)
  }

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/delete-user/${id}`, {
      method: "DELETE",
    })
      .then((r) => r.json())
      .then((response) => {
        console.log(response)
        if (response.status === "success") {
        setRows(rows.filter(row => row.id !== id))
        console.log("User deleted successfully.")
      } else {
        console.error("Failed to delete user.")
      }
    })
    .catch((error) => {
      console.error("Error occurred while deleting user:", error)
    })
  }
  
  const actionColumn =[{field: "action", headerName: "Action", width: 200, renderCell:(params)=>{
    const isInEditMode = rowModesModel[params.row.id]?.mode === GridRowModes.Edit

    if (isInEditMode) {
      return (
        <Box>
            <Tooltip title='Save'>
                <IconButton onClick={handleSaveClick(params.row.id)}>
                    <SaveIcon/>
                </IconButton>
            </Tooltip>
            <Tooltip title='Cancel'>
                <IconButton onClick={handleCancelClick(params.row.id)}>
                    <CancelIcon/>
                </IconButton>
            </Tooltip>
        </Box>
      )
    }

    return(
      
      <Box>
       <Tooltip title='Edit'>
           <IconButton onClick={()=>{handleEditClick(params.row.id)}}>
               <Edit/>
           </IconButton>
       </Tooltip>
       <Tooltip title='Delete'>
           <IconButton onClick={()=>handleDelete(params.row.id)}>
               <DeleteIcon/>
           </IconButton>
       </Tooltip>
   </Box>
    )
  }}]

  

  const columns= [
    {field: 'id', headerName: 'ID'},
    {field: 'firstname', headerName: 'Firstname'},
    {field: 'surname', headerName: 'Surname'},
    {field: 'email', headerName: 'Email'},
    {field: 'password', headerName: 'Password'},
    {field: '_is_activated', headerName: '_Is_Activated'},
    {field: 'phone', headerName: 'Phone'},
    {field: 'role', headerName: 'Role', editable: true},
    
  ];

  useEffect(()=>{
    fetch("http://127.0.0.1:5000/users")
    .then(resp=>resp.json())
    .then(resp=>{
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
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={(updatedRow, originalRow) => 
          handleUpdate(updatedRow)
        }
        onProcessRowUpdateError={(error) => console.error(error)}
      />
        </div>
      </div>
    </div>
  )
}

export default AdminUsers