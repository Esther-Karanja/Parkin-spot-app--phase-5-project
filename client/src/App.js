import './styles.css'
import {Routes , Route} from 'react-router-dom'
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Login from './Components/Login';
import Signup from './Components/Signup';
import HowItWorks from './Components/HowItWorks';
import Reviews from './Components/Reviews';
import AdminPanel from './Components/AdminPanel';
import AdminUsers from './Components/AdminUsers';
import AdminReviews from './Components/AdminReviews';
import AdminParkingSpots from './Components/AdminParkingSpots';
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
        <Route path= "/try-autocomplete"element={<TryAutocomplete/>} /> {/* Change Map to BookingPage if you have one */}
        <Route path= "/Booking"element={<BookingForm/>} />
        <Route path= "/AutomaticBookingForm"element={<AutomaticBookingForm />} />
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/admin">
          <Route index element={<AdminPanel/>}/>
          <Route path="user" element={<AdminUsers/>}/> 
          <Route path="parkingspots" element={<AdminParkingSpots/>}/>
          <Route path="reviews" element={<AdminReviews/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
