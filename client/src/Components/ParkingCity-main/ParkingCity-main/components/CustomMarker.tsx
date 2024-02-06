import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import { Marker } from 'react-native-maps';

const CustomMarker = ({ booking, onPress }) => {
  return (
    <Marker
        onPress={onPress}
        coordinate={{
          latitude: booking.latitude,
          longitude: booking.longitude
        }}
        >
          <View style={styles.marker}>
          <Text style={styles.priceText}>
            Kshs {booking.price}
          </Text>
          </View>
        </Marker>)
};

export default CustomMarker;

const styles = StyleSheet.create({
    marker: {
        backgroundColor: 'white',
        padding: 3,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 20,
      },
    priceText: {
        fontWeight: 'bold', 
      },
})