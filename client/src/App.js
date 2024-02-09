import './styles.css'
import { Route, Routes } from 'react-router-dom';


import Signup from './Components/Signup';
import Login from './Components/Login';

import Navbar from './Components/Navbar';
import Home from './Components/Home';
// import SignupLogin from './Components/SignupLogin';
import HowItWorks from './Components/HowItWorks';
import Reviews from './Components/Reviews';
import AdminPanel from './Components/AdminPanel';
import AdminUsers from './Components/AdminUsers';
import AdminReviews from '/Components/AdminReviews';
import AdminParkingSpots from './Components/AdminParkingSpots';
import AdminSidebar from './Components/AdminSidebar';
import TryAutocomplete from './Components/TryAutocomplete'; // Import the TryAutocomplete component
import BookingForm from './Components/BookingForm';
import  AutomaticBookingForm from  './Components/Automatic';
     

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/reviews" element={<Reviews />} />
        {/* <Route path="/signuplogin" element={<SignupLogin />} /> */}
        {/* Add the route for the booking page */}
        <Route path= "/try-autocomplete"element={< TryAutocomplete/>} /> {/* Change Map to BookingPage if you have one */}
        <Route path= "/Booking"element={< BookingForm/>} />
        <Route path= "/AutomaticBookingForm"element={<AutomaticBookingForm />} />

        <Route path="/" element={<Home/>}/>
        <Route path="/how-it-works" element={<HowItWorks/>}/>
        <Route path="/reviews" element={<Reviews/>}/>
        {/* <Route path="/sign-up" element={<SignUp/>}/> */}
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>

        <Route path="/admin" element={<AdminPanel/>}>
          <Route path='/admin/user' element={AdminUsers/>}/> 
          <Route path='/admin/parkingspots' element={<AdminParkingSpots/>}/>
          <Route path='/admin/reviews' element={<AdminReviews/>}/>
        </Route>

        // <Route path="/admin" element={<AdminPanel />}>
        //   <Route path='/admin/login' element={<Adminlogin />} />
        //   <Route path='/admin/navBar' element={<AdminnavBar />} />
        //   <Route path='/admin/sidebar' element={<AdminSidebar />} />
        // </Route>
      </Routes>
    </div>
  );
}

export default App;
