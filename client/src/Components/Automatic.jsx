// import React, { useEffect, useState } from 'react';

// const AutomaticBookingForm = () => {
//   useEffect(() => {
//     const initAutocomplete = () => {
//       const defaultPosition = { lat: 35.0823294, lng: -106.8165662 };
//       const map = new window.google.maps.Map(document.getElementById('map'), {
//         center: defaultPosition,
//         zoom: 13,
//         mapTypeId: 'roadmap',
//       });

//       const markers = [];
//       const locations = [];
//       let distanceDirection;
//       let distanceDisplay;

//       const string2Location = (input, index) => {
//         const searchBox = new window.google.maps.places.SearchBox(input);
//         map.addListener('bounds_changed', () => {
//           searchBox.setBounds(map.getBounds());
//         });
//         searchBox.addListener('places_changed', () => {
//           const places = searchBox.getPlaces();
//           if (places.length === 0) return;
//           markers[index]?.setMap(null);
//           const bounds = new window.google.maps.LatLngBounds();
//           places.forEach(place => {
//             if (!place.geometry) return;
//             const icon = {
//               url: place.icon,
//               size: new window.google.maps.Size(71, 71),
//               origin: new window.google.maps.Point(0, 0),
//               anchor: new window.google.maps.Point(17, 34),
//               scaledSize: new window.google.maps.Size(25, 25)
//             };
//             markers[index] = new window.google.maps.Marker({
//               map: map,
//               icon: icon,
//               title: place.name,
//               position: place.geometry.location
//             });
//             locations[index] = place.geometry.location;
//             if (place.geometry.viewport) {
//               bounds.union(place.geometry.viewport);
//             } else {
//               bounds.extend(place.geometry.location);
//             }
//           });
//           map.fitBounds(bounds);
//           calcRoute();
//         });
//       };

//       const calcDistance = (start, end) => {
//         return (window.google.maps.geometry.spherical.computeDistanceBetween(start, end) / 1000).toFixed(2);
//       };

//       const calcRoute = () => {
//         const start = new window.google.maps.LatLng(locations[0]?.lat(), locations[0]?.lng());
//         const end = new window.google.maps.LatLng(locations[1]?.lat(), locations[1]?.lng());
//         if (!start || !end) return;
//         const value_distance = document.querySelector("#value-distance");
//         const value_price = document.querySelector("#value-price");
//         const distance = calcDistance(start, end);
//         value_distance.innerHTML = distance + " KM";
//         value_price.innerHTML = (distance * 5) + " USD";
//         const bounds = new window.google.maps.LatLngBounds();
//         bounds.extend(start);
//         bounds.extend(end);
//         map.fitBounds(bounds);
//         distanceDirection = new window.google.maps.DirectionsService();
//         distanceDisplay = new window.google.maps.DirectionsRenderer();
//         const request = {
//           travelMode: window.google.maps.TravelMode.DRIVING,
//           origin: start,
//           destination: end,
//         };
//         distanceDirection.route(request, (response, status) => {
//           if (status === window.google.maps.DirectionsStatus.OK) {
//             distanceDisplay.setDirections(response);
//             distanceDisplay.setMap(map);
//           }
//         });
//       };

//       const fromInput = document.getElementById('from-input');
//       const toInput = document.getElementById('to-input');
//       string2Location(fromInput, 0);
//       string2Location(toInput, 1);
//     };

//     const script = document.createElement('script');
//     script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places&callback=initAutocomplete`;
//     script.async = true;
//     document.body.appendChild(script);

//     return () => {
//       // Clean up code if needed
//     };
//   }, []);

//   return (
//     <div className="container">
//       <div className="row">
//         <form id="form" className="col-sm-8">
//           <div className="form-group">
//             <b><label htmlFor="from-input">From</label></b>
//             <input type="search" className="form-control" id="from-input" placeholder="From" />
//           </div>
//           <div className="form-group">
//             <b><label htmlFor="to-input">To</label></b>
//             <input type="search" className="form-control" id="to-input" placeholder="To" />
//           </div>
//           <div className="form-group">
//             <b><label htmlFor="to-input">Entry time</label></b>
//             <input type="text" className="form-control" placeholder="Step At" />
//           </div>
//           <button id="submit" type="submit" className="btn btn-primary">Submit</button>
//         </form>
//         <div id="form" className="form-horizontal col-sm-4">
//           <div className="form-group">
//             <b><label htmlFor="to-input">Time</label></b>
//             <label id="value-distance" className="form-text">Choose your duration</label>
//           </div>
//           <div className="form-group">
//             <b><label htmlFor="to-input">Price per Hour</label></b>
//             <label id="price" className="form-text">300 ksh</label>
//           </div>
//           <div className="form-group">
//             <b><label htmlFor="to-input">Total Price</label></b>
//             <label id="value-price" className="form-text">Press on the submit button to book</label>
//           </div>
//         </div>
//       </div>
//       <div id="map"></div>
//     </div>
//   );
// };

// export default AutomaticBookingForm;