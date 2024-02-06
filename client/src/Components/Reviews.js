import {useState, useEffect, React} from 'react'
import TextField from "@mui/material/TextField";
import ReviewsList from './ReviewsList'

const Reviews = () => {
  const [reviewsData, setReviewsData] = useState([])
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:5000/reviews")
    .then((response) => response.json())
    .then((fetchData) => setReviewsData(fetchData))
    .catch((error) => {console.error('Fetch error:',error)})
  },[])

  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value)
    fetch(`http://127.0.0.1:5000/reviews/${searchInput}`)
    .then((response) => response.json())
    .then((fetchData) => setReviewsData(fetchData))
    .catch((error) => {console.error('Fetch error:',error)})
  }

  console.log(reviewsData)
  
  return (
    <div className='search-warpper'>
      <div className='search-bar'>
        <TextField
            id="outlined-basic"
            variant="outlined"
            fullWidth
            label="Search"
            onChange={handleChange}
        />
      </div>
      <button />
      <ReviewsList reviews={reviewsData} />
    </div>
  )
}

export default Reviews;