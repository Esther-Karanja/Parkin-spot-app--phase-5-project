import React from 'react'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import PersonIcon from '@mui/icons-material/Person';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';

const widget= ({type}) => {

  let data;

    //temporary test data to be replaced with backend real data
    const number = 100;
    const percentage = 20;

  switch (type) {
    case "user":
      data = {
        title: "USERS",
        isNumber: true,
        link: "See all users",
        icon: (
          <PersonIcon
            className="widget-icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "all parking spots":
      data = {
        title: "ALL PARKING SPOTS",
        isNumber: false,
        link: "see all parking spots",
        icon: (
          <DirectionsCarIcon
            className="widget-icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "booked parking spots":
      data = {
        title: "BOOKED PARKING",
        isNumber: true,
        link: "see booked parking spots",
        icon: (
          <DirectionsCarIcon
            className="widget-icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "red" }}
          />
        ),
      };
      break;
    case "available parking spots":
      data = {
        title: "AVAILABLE PARKING",
        isNumber: true,
        link: "See available parking spots",
        icon: (
          <DirectionsCarIcon
            className="widget-icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "green",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }
  return (
    <div className='widget'>
      <div className='left'>
        <span className='widget-title'>{data.title}</span>
        <span className='widget-counter'>{data.isNumber} {number}</span>
        <span className='widget-link'>see all users</span>
      </div>
      <div className='right'>
        <div className='percentage positive'>
          <KeyboardArrowUpIcon/>
          {percentage}%
        </div>
        {data.icon}
      </div>

    </div>
  )
}

export default widget