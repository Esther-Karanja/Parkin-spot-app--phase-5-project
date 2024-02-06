import {useState, useEffect, React} from 'react'

const Reviews = () => {
  const [reviewsData, setReviewsData] = useState(null)

  useEffect(() => {
    fetch("http://127.0.0.1:5000/reviews")
    .then((response) => response.json())
    .then((fetchData) => setReviewsData(fetchData))
  },[])

  console.log(reviewsData)
  
  return (
    <div>Reviews</div>
  )
}

export default Reviews