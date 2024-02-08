import React from 'react';

const CustomMarker = ({ booking, onPress }) => {
  return (
    <div className="marker" style={styles.marker}>
      <p className="priceText" style={styles.priceText}>
        Kshs {booking.price}
      </p>
    </div>
  );
};

export default CustomMarker;

const styles = {
  marker: {
    backgroundColor: 'white',
    padding: 3,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 20,
  },
  priceText: {
    fontWeight: 'bold', // Ensure bold font weight is applied
  },
};
