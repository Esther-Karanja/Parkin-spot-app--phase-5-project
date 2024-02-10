import {useState, useEffect, React} from 'react'
import '../reviews.css'
import Review from './Review';
import ReviewForm from './ReviewForm';
import Searchbar from './SearchBar';
import SearchIcon from '@mui/icons-material/Search';

const Reviews = () => {
  const [reviewsData, setReviewsData] = useState([])
  const [searchInput, setSearchInput] = useState("");
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [formPopup, setFormPopup] = useState(false)


  useEffect(() => {
    fetch("http://127.0.0.1:5000/reviews")
    .then((response) => response.json())
    .then((fetchData) => {
      setReviewsData(fetchData)
      setFilteredReviews(fetchData);
    })
    .catch((error) => {console.error('Fetch error:',error)})
  },[searchInput])

  const handleChange = (e) => {
    setSearchInput(e.target.value);
  };
  
  const handleClick = () => {
    filterReviews();
  };
  
  const filterReviews = () => {
    if (searchInput.trim() !== "") {
      const reviewsToDisplay = reviewsData.filter((review) => {
        return review.location.toLowerCase().includes(searchInput.toLowerCase());
      });
      setFilteredReviews(reviewsToDisplay);
    } else {
      setFilteredReviews(reviewsData);
    }
  };

  return (
    <div className='div-container'>
      <div className='search-bar' >
        <Searchbar onChange={handleChange} />
        <SearchIcon className='search-icon'  onClick={handleClick}/>
        <button className='btn' onClick={() => setFormPopup(true)}>Add review</button>
      </div>
      <ReviewForm trigger={formPopup} setTrigger={setFormPopup} setFormPopup={setFormPopup}/>
      <div className='cards-container'>
        {filteredReviews.map((review) => (
          <Review key={review.id} review={review} />
        ))}
      </div>
    </div>
  )
}

export default Reviews;