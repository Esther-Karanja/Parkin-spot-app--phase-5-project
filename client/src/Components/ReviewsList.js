import React,{useState} from 'react';
import Review from './Review';
import ReviewForm from './ReviewForm';
import '../reviews.css'

const ReviewsList = ({reviews}) => {
    const [formPopup, setFormPopup] = useState(false)

    const handleNewreview = () => {

    }
    return(
        <div>
            <div>
                <button className='btn' onClick={() => setFormPopup(true)}>Add review</button>
                <ReviewForm trigger={formPopup} setTrigger={setFormPopup} onAddStory={handleNewreview}/>
            </div>
            <div className='container'>
                {reviews.map((review) => (
                        <Review key={review.id} review={review} />
                    ))}
            </div>
        </div>
        
    )
}

export default ReviewsList;