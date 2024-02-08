import {useState, useEffect, React} from 'react'
import TextField from "@mui/material/TextField";
import '../reviews.css'
import Review from './Review';
import ReviewForm from './ReviewForm';

const Reviews = () => {
  const [reviewsData, setReviewsData] = useState([])
  const [searchInput, setSearchInput] = useState("");
  const [formPopup, setFormPopup] = useState(false)



  useEffect(() => {
    fetch("http://127.0.0.1:5000/reviews")
    .then((response) => response.json())
    .then((fetchData) => setReviewsData(fetchData))
    .catch((error) => {console.error('Fetch error:',error)})
  },[reviewsData])

  const handleNewreview = (newReview) => {
    setReviewsData([...reviewsData,newReview])
  }

  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value)
    fetch(`http://127.0.0.1:5000/reviews`)
    .then((response) => response.json())
    .then((fetchData) => {
      const reviewsToDisplay = fetchData.filter((review) => {
        return(review.location.toLowerCase().includes(searchInput.toLowerCase()))
      })
      setReviewsData(reviewsToDisplay)})
    .catch((error) => {console.error('Fetch error:',error)})
  }

  
  
  return (
    <div className='div-container'>
      <div className='search-bar'>
        <TextField
            id="outlined-basic"
            variant="outlined"
            fullWidth
            label="Search"
            onChange={handleChange}
        />
        <button className='btn' onClick={() => setFormPopup(true)}>Add review</button>
      </div>
      <ReviewForm trigger={formPopup} setTrigger={setFormPopup} onAddReview={handleNewreview} setFormPopup={setFormPopup}/>
      <div className='cards-container'>
        {reviewsData.map((review) => (
          <Review key={review.id} review={review} />
        ))}
      </div>
    </div>
  )
}

export default Reviews;