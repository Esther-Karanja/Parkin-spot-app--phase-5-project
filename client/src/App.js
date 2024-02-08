import './styles.css'
import Home from './Components/Home';
import { Route, Routes } from 'react-router-dom';
import Signup from './Components/Signup';
import Login from './Components/Login';
import Navbar from './Components/Navbar';
// import SignUp from './Components/SignUp';
import HowItWorks from './Components/HowItWorks';
import Reviews  from './Components/Reviews';
import AdminPanel from './Components/AdminPanel';
import Adminlogin from './Components/Adminlogin';
import AdminnavBar from './Components/AdminnavBar';
import AdminSidebar from './Components/AdminSidebar';


function App() {
  return (
    <div className="App">
      <Navbar/>
      {/* <Router> */}
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/how-it-works" element={<HowItWorks/>}/>
        <Route path="/reviews" element={<Reviews/>}/>
        {/* <Route path="/sign-up" element={<SignUp/>}/> */}
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>

        <Route path="/admin" element={<AdminPanel/>}>
          <Route path='/admin/login' element={<Adminlogin/>}/> 
          <Route path='/admin/navBar' element={<AdminnavBar/>}/>
          <Route path='/admin/sidebar' element={<AdminSidebar/>}/>
        </Route>
        
      </Routes>
      {/* </Router> */}
  
    </div>
  );
}

export default App;
