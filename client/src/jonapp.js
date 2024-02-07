import React, { useRef } from 'react';
import { Button, Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { BottomSheetModal, BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Map from './components/index';
import BookItem from './components/BookItem';
import CustomMarker from './components/CustomMarker';

export default function JonApp() {
  const bottomSheetModalRef = useRef(null);
  const snapPoints = ["30%"];

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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Map style={styles.map} />
      <BottomSheetModalProvider>
        <View style={styles.buttonContainer}>
          <Button title='Present Modal' onPress={handlePresentModal} />
          <StatusBar style="auto" />
          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={0}
            snapPoints={snapPoints}
            backgroundStyle={{ borderRadius: 50 }}
          >
            <View style={styles.contentContainer}>
              <View style={styles.rowContainer}>
                <Text style={styles.title}>Garden City Mall</Text>
                <Text style={styles.priceTag}>Ksh 500</Text>
              </View>
              <Text>Add Tip</Text>
              <TouchableOpacity onPress={handleBooking} style={styles.bookNowButton}>
                <Text style={{ color: 'white' }}>BOOK NOW</Text>
              </TouchableOpacity>
            </View>
          </BottomSheetModal>
        </View>
      </BottomSheetModalProvider>
      {/* Render BookItem and CustomMarker with sample booking data */}
      <BookItem booking={booking} />
      <CustomMarker booking={booking} />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
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
    paddingHorizontal: 15,
    marginTop: 10,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  title: {
    fontWeight: "900",
    letterSpacing: 0.5,
    fontSize: 18,
  },
  priceTag: {
    fontWeight: "900",
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
    alignSelf: 'center', // Center the button horizontally
  },
});
