import React from 'react';
import '../reviews.css'

const Review = ({review}) => {
    return(
            <div key={review.id} className='card'>
                <div className='card-content'>
                    <h5>{review.location}</h5>
                    <p>{review.review}</p>
                    <p>~ {review.user_firstname} {review.user_surname}</p>
                    <p>{review.time}</p>
                </div>
            </div>
    )
}

export default Review