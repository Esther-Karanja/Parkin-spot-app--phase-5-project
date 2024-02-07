import React from 'react';

const BookItem = ({ booking }) => {
  return (
    <div className="card" style={styles.card}>
      <img src={booking.image} alt="Booking" style={styles.image} />
      <div className="rightContainer" style={styles.rightContainer}>
        <h2 className="title" style={styles.title}>{booking.title}</h2>
        <p className="description" style={styles.description}>This is the best available parking spot. Awesome!</p>

        <div className="footer" style={styles.footer}>
          <p className="price" style={styles.price}>Kshs {booking.price}</p>
          <p>
            ⭐ {booking.rating} ({booking.numberOfStars})
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookItem;

const styles = {
  card: {
    backgroundColor: 'white',
    position: 'relative',
    bottom: 70,
    left: 10,
    right: 10,
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 8,
    overflow: 'hidden', // Ensure the border radius works as expected
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', // Simulate elevation
  },
  rightContainer: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  description: {
    color: 'gray',
  },
  price: {
    fontSize: 16,
    color: 'green', // Adjust the color as needed
  },
  image: {
    width: 150,
    aspectRatio: 1,
  },
  footer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 'auto',
  },
};

