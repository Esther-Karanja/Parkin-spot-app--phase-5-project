import React, {useState, useEffect} from 'react';
import Dropdown from './Dropdown';
//mport {v4 as uuid} from 'uuid';

function ReviewForm({trigger, setTrigger, setFormPopup}) {

    const [firstName,setFirstName] = useState("")
    const [surname,setSurname] = useState("")
    const [review,setNewReview] = useState("")
    const [location,setLocation] = useState("")
    const [locationOptions,setLocationOptions] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [firstNameError, setfirstNameError] = useState("")
    const [surnameError, setSurnameError] = useState("")
    const [locationError, setLocationError] = useState("")
    const [reviewError, setReviewError] = useState("")

    const handleSubmit = (event) =>{
        event.preventDefault()
        if (!firstName && !surname && !review && !location) {
          setErrorMessage("All fields are required.")
          return
      }
        if (!firstName) {
          setfirstNameError("First name is required.")
          return
        }
        if (!surname) {
          setSurnameError("Surname is required.")
            return
        }
        if (!location) {
          setLocationError("Location is required.")
          return;
        }
        if (!review) {
          setReviewError("Review is required.")
          return;
        }

        const formData = {
          firstname: firstName,
          surname: surname,
          review: review,
          location: location
        }
        fetch("http://localhost:5000/add-reviews",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
        .then((r) => r.json)
        .then(() => {

          setTimeout(() => {
            setFirstName('')
            setSurname('')
            setNewReview('')
            setLocation('')
            setFormPopup(false)
          }, 2000)
        })
    }

    
    useEffect(() => {
      fetch("http://localhost:5000/parking")
      .then((r) => r.json())
      .then((parkings) => setLocationOptions(parkings))
  },[])

    return (trigger) ? (
        <div onClick={() => setFormPopup(false)} className='pop-up-container'>
          <div onClick={(e) => {e.stopPropagation()}} className='pop-up-content'>
            <button className='pop-up-btn' onClick={() => setTrigger(false)}>X</button>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            <form onSubmit={handleSubmit}>
                <label htmlFor="FirstName">First Name:</label>
                {firstNameError && <div className="error-message">{firstNameError}</div>}
                <input 
                type="text" 
                id="FirstName" 
                placeholder='First Name' 
                name="FirstName" 
                value={firstName} 
                onChange={(e) => setFirstName(e.target.value)}/>

                <label htmlFor="Surname">Surname:</label>
                {surnameError && <div className="error-message">{surnameError}</div>}
                <input 
                type="text" 
                id="Surname" 
                placeholder='Surname' 
                name="Surname" 
                value={surname} 
                onChange={(e) => setSurname(e.target.value)}/>

                
                <label htmlFor="location">Location:</label>
                {locationError && <div className="error-message">{locationError}</div>}
                <Dropdown setLocation={setLocation} locationOptions={locationOptions}/>

                <label htmlFor="message">Review:</label>
                {reviewError && <div className="error-message">{reviewError}</div>}
                <textarea 
                id="review" 
                name="review" 
                value={review} 
                onChange={(e) => setNewReview(e.target.value)}/>

                <button type="submit" className='submit-btn'>Submit</button> 
            </form>
          </div>           
        </div>
    ) : null
}

export default ReviewForm;