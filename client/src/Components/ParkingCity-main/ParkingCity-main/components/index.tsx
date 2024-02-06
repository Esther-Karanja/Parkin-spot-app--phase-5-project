import React, { useState } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet, View, Text } from 'react-native';
import bookings from '../assets/data/bookings.json'
import CustomMarker from './CustomMarker';
import BookItem from './bookItem';


const INITIAL_REGION = {
  "latitude": -1.2921,
  "longitude": 36.8210,
  "latitudeDelta": 0.015,
  "longitudeDelta": 0.0121
}


export default function Map() {
  const [selectedParkingSpot, setSelectedParkingSpot] = useState(null);

  return (
    <View style={styles.container}>
      <MapView style={StyleSheet.absoluteFill}
      provider={PROVIDER_GOOGLE}
      initialRegion={INITIAL_REGION}
      showsUserLocation
      showsMyLocationButton
      >
      {bookings.map((booking) => (
        <CustomMarker 
        key={booking.id} 
        booking={booking} 
        onPress={() => setSelectedParkingSpot(booking)}/>
      ))}
      </MapView>
      {/** Display selected booking */}
      
      {selectedParkingSpot && <BookItem booking={selectedParkingSpot} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  }
});
