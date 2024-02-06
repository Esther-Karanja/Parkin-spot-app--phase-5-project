import React, {useState} from 'react';
import {v4 as uuid} from 'uuid';

function ReviewForm({trigger, setTrigger, onAddStory}) {
    const [firstName,setFirstName] = useState("")
    const [surname,setSurname] = useState("")
    const [newReview,setNewReview] = useState("")

    function handleSubmit(event){
        event.preventDefault()
        const formData = {
          id:uuid(),
          Firstname: firstName,
          Surname: surname,
          Review: newReview
        }
        fetch("http://localhost:5000/add-reviews",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
        .then((r) => r.json)
        .then((newReview) => onAddStory(newReview))
    }

    return (trigger) ? (
        <div className='pop-up-container'>
          <div className='pop-up-content'>
            <button className='pop-up-btn' onClick={() => setTrigger(false)}>X</button>
            <form onSubmit={handleSubmit}>
                <label htmlFor="FirstName">First Name:</label>
                <input type="text" id="FirstName" placeholder='First Name' name="FirstName" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>

                <label htmlFor="Surname">Surname:</label>
                <input type="text" id="Surname" placeholder='Surname' name="Suname" value={surname} onChange={(e) => setSurname(e.target.value)}/>

                <label htmlFor="message">Review:</label>
                <textarea id="review" name="review" value={newReview} onChange={(e) => setNewReview(e.target.value)}/>

                <button type="submit" className='submit-btn'>Submit</button> 
            </form>
          </div>           
        </div>
    ) : ""
}

export default ReviewForm;