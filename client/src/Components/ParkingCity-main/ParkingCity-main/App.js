import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { BottomSheetModal, BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { useRef } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Map from './components/index';

export default function App() {
  const bottomSheetModalRef = useRef(null);
  const snapPoints = ["30%"];

  function handlePresentModal() {
    bottomSheetModalRef.current?.present();
  }

  function handleBooking() {
    console.log("Booking logic goes here");
  }

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
    ...StyleSheet.absoluteFillObject,
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
});

