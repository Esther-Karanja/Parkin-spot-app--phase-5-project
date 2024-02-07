import React, { useRef, useState } from 'react';
import Map from './components/index';
import BookItem from './components/BookItem';
import CustomMarker from './components/CustomMarker';

export default function JonApp() {
  const bottomSheetModalRef = useRef(null);
  const snapPoints = ["30%"];
  const [selectedParkingSpot, setSelectedParkingSpot] = useState(null);

  function handlePresentModal() {
    bottomSheetModalRef.current?.present();
  }

  function handleBooking() {
    console.log("Booking logic goes here");
    // Replace this console.log with your actual booking logic
  }

  // Sample booking data
  const booking = {
    id: 1,
    image: 'image-url.jpg',
    title: 'Parking Spot',
    description: 'This is the best available parking spot. Awesome!',
    price: 500,
    rating: 4.5,
    numberOfStars: 50,
    latitude: 123.456,
    longitude: 789.123
  };

  return (
    <div style={{ display: 'flex', flex: 1 }}>
      <Map style={styles.map} />
      <div style={styles.buttonContainer}>
        <button onClick={handlePresentModal}>Present Modal</button>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          snapPoints={snapPoints}
          backgroundStyle={{ borderRadius: 50 }}
        >
          <div style={styles.contentContainer}>
            <div style={styles.rowContainer}>
              <h2 style={styles.title}>Garden City Mall</h2>
              <p style={styles.priceTag}>Ksh 500</p>
            </div>
            <p>Add Tip</p>
            <button onClick={handleBooking} style={styles.bookNowButton}>
              BOOK NOW
            </button>
          </div>
        </BottomSheetModal>
      </div>
      {/* Render BookItem and CustomMarker with sample booking data */}
      <BookItem booking={booking} />
      <CustomMarker booking={booking} />
    </div>
  );
}

const styles = {
  container: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  contentContainer: {
    flex: 1,
    padding: 15,
    marginTop: 10,
  },
  rowContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  title: {
    fontWeight: "bold",
    letterSpacing: 0.5,
    fontSize: 18,
  },
  priceTag: {
    fontWeight: "bold",
    letterSpacing: 0.5,
    fontSize: 18,
  },
  map: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: -1,
  },
  bookNowButton: {
    width: '100%',
    height: 50,
    backgroundColor: 'red',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
  },
};
