
// import {React, useState, useEffect} from 'react'
// import AdminSidebar from './AdminSidebar';
// import AdminnavBar from './AdminnavBar';
// import { DataGrid, GridColDef,} from '@mui/x-data-grid';
// // import {Link} from 'react-router-dom'


// const AdminReviews = () => {
//   const actionColumn =[{field: "action", headerName: "Action", width: 200, renderCell:()=>{
//     return(
//       <div className='cellAction'>
//         {/* <Link to='/admin/users/reviewsId'>
//            <div className='viewButton'>View</div>
//         </Link> */}
//         <div className='deleteButton'>Delete</div>
//       </div>
//     )
//   }}]

//   const [rows, setRows]= useState([])

//   const columns: GridColDef[] = [
//     { field: 'id', headerName: 'ID'},
//     { field: 'review', headerName: 'Review'},
//     { field: 'time', headerName: 'Time'},
//     {field: 'user_firstname', headerName: 'First Name'},
//     {field: 'user_surname', headerName: 'Surame'},
//     {field: 'location', headerName: 'Location'},
    
//   ];

//   useEffect(()=>{
//     fetch("http://127.0.0.1:5000/reviews")
//     .then(resp=>resp.json())
//     .then(resp=>{
//       console.log(resp)
//       setRows(resp)})
//   },[])
//   return (
//     <div className='admin-reviews'>
//       <AdminSidebar/>
//       <div className='reviewscontainer'>
//         <AdminnavBar/>
//         <div className='reviewstable'>
//         <DataGrid
//         rows={rows}
//         columns={columns.concat(actionColumn)}
//         initialState={{
//           pagination: {
//             paginationModel: { page: 0, pageSize: 5 },
//           },
//         }}
//         rowsPerPageOptions={[5]}
//         pageSizeOptions={[5,10, 15, 20, 25, 30]}
//         checkboxSelection
//         getRowId={(row) => row.id}
        
//       />
//         </div>
//       </div>
//     </div>
//   )
// }

// export default AdminReviews