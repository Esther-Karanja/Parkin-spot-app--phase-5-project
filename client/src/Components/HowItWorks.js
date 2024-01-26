import React from 'react'
// import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
// import DriveEtaOutlinedIcon from '@mui/icons-material/DriveEtaOutlined';
// import AddLocationAltOutlinedIcon from '@mui/icons-material/AddLocationAltOutlined';
import rari from '../Images/rari.png'
import search from '../Images/search.avif'
import location from '../Images/location.png'



const HowItWorks = () => {

  const infoData =[
    {
      image: search,
      title: "Tell us where you are going",
      text: "Our super smart app will quickly find the best space for you."
    },
    {
      image: rari,
      title: "Book guaranteed parking in seconds",
      text: "Scroll through the available spaces and check out reviews & photos. Then just tap book and relax , parking has never been simpler."
    },
    {
      image: location,
      title: "You are all set",
      text: "Find directions & access instructions and amend your booking if needed -  all through your JustPark account. And, if you need anything else, our Customer Service team is always there to help."
    },
  ]
  return (
    <div className='work-section-wrapper'>
      <div className='work-section-top'>
        <h1 className='primary-subheading'>The simplest way to book a parking space!</h1>
        <p className='primary-text'>
        Simply enter where & when you'll need parking and we'll find the perfect space for you in seconds!
        Our huge network of bookable parking spaces & driveways gets you closer to where you need to be. By 
        reserving your parking, you will save time & money on all your journeys, whether it is your daily commute, 
        an evening gig or a weekend away.
        </p>
      </div>
      <div className="work-section-bottom">
        {infoData.map((data) => (
          <div className="work-section-info" key={data.title}>
            <div className="info-boxes-img-container">
              <img src={data.image} alt="" />
            </div>
            <h2>{data.title}</h2>
            <p>{data.text}</p>
          </div>
        ))}
        {/* <button className='secondary-button'>Show parking spaces</button> */}
      </div>

    </div>
  );
};
  

export default HowItWorks