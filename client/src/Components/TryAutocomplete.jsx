// import React, { useEffect } from 'react';


// const TryAutocomplete = () => {
//   useEffect(() => {
//     const initAutocomplete = () => {
//       const autocomplete = new window.google.maps.places.Autocomplete(
//         document.getElementById('autocomplete'),
//         { types: ['geocode'] }
//       );
//       autocomplete.setFields(['address_component']);
//       autocomplete.addListener('place_changed', fillInAddress);
//     };

//     const fillInAddress = () => {
//       const place = autocomplete.getPlace();
//       for (const component in componentForm) {
//         document.getElementById(component).value = '';
//         document.getElementById(component).disabled = false;
//       }
//       for (let i = 0; i < place.address_components.length; i++) {
//         const addressType = place.address_components[i].types[0];
//         if (componentForm[addressType]) {
//           const val = place.address_components[i][componentForm[addressType]];
//           document.getElementById(addressType).value = val;
//         }
//       }
//     };

//     const geolocate = () => {
//       if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(position => {
//           const geolocation = {
//             lat: position.coords.latitude,
//             lng: position.coords.longitude
//           };
//           const circle = new window.google.maps.Circle({
//             center: geolocation,
//             radius: position.coords.accuracy
//           });
//           autocomplete.setBounds(circle.getBounds());
//         });
//       }
//     };

//     initAutocomplete();

//     return () => {
//       // Clean up code if needed
//     };
//   }, []);

//   const componentForm = {
//     street_number: 'short_name',
//     route: 'long_name',
//     locality: 'long_name',
//     administrative_area_level_1: 'short_name',
//     country: 'long_name',
//     postal_code: 'short_name'
//   };

//   return (
//     <div>
//       <div id="locationField">
//         <input
//           id="autocomplete"
//           placeholder="Enter your address"
//           onFocus={geolocate}
//           type="text"
//         />
//       </div>
//       <table id="address">
//         <tbody>
//           <tr>
//             <td className="label">Street address</td>
//             <td className="slimField">
//               <input className="field" id="street_number" disabled={true} />
//             </td>
//             <td className="wideField" colSpan="2">
//               <input className="field" id="route" disabled={true} />
//             </td>
//           </tr>
//           <tr>
//             <td className="label">City</td>
//             <td className="wideField" colSpan="3">
//               <input className="field" id="locality" disabled={true} />
//             </td>
//           </tr>
//           <tr>
//             <td className="label">State</td>
//             <td className="slimField">
//               <input className="field" id="administrative_area_level_1" disabled={true} />
//             </td>
//             <td className="label">Zip code</td>
//             <td className="wideField">
//               <input className="field" id="postal_code" disabled={true} />
//             </td>
//           </tr>
//           <tr>
//             <td className="label">Country</td>
//             <td className="wideField" colSpan="3">
//               <input className="field" id="country" disabled={true} />
//             </td>
//           </tr>
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default TryAutocomplete;
const TryHtml = () => {
 // useEffect(() => {
    //const initAutocomplete = () => {
     // const autocomplete = new window.google.maps.places.Autocomplete(
      //  document.getElementById('autocomplete'),
      //  { types: ['geocode'] }
  //    );
 //     autocomplete.setFields(['address_component']);
 //     autocomplete.addListener('place_changed', fillInAddress);
 //   };

 //   const fillInAddress = () => {
//      const place = autocomplete.getPlace(); // Define `autocomplete` here
//      for (const component in componentForm) {
//        document.getElementById(component).value = '';
//        document.getElementById(component).disabled = false;
//      }
//      for (let i = 0; i < place.address_components.length; i++) {
 //       const addressType = place.address_components[i].types[0];
//        if (componentForm[addressType]) {
//          const val = place.address_components[i][componentForm[addressType]];
//          document.getElementById(addressType).value = val;
//        }
//      }
//    };

//    const geolocate = () => {
//      if (navigator.geolocation) {
  //      navigator.geolocation.getCurrentPosition(position => {
    //      const geolocation = {
      //      lat: position.coords.latitude,
        //    lng: position.coords.longitude
          //};
//          const circle = new window.google.maps.Circle({
  //          center: geolocation,
    //        radius: position.coords.accuracy
      //    });
        //  autocomplete.setBounds(circle); // Define `autocomplete` here
//        });
//      }
 //   };

//    const componentForm = {
//      street_number: 'short_name',
//      route: 'long_name',
//      locality: 'long_name',
//      administrative_area_level_1: 'short_name',
 //     country: 'long_name',
//      postal_code: 'short_name'
//    };

//    initAutocomplete();

//    return () => {
      // Clean up code if needed
//    };
//  }, []);

  // return (
  //   <html>
  //     <head>
  //       <title>Place Autocomplete</title>
  //       <meta charset="utf-8" />
  //       <meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
  //       <link type="text/css" rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />
  //       <style>
  //         {`
  //         #map {
  //           height: 100%;
  //         }
  //         html,
  //         body {
  //           height: 100%;
  //           margin: 0;
  //           padding: 0;
  //         }
  //         #locationField,
  //         #controls {
  //           position: relative;
  //           width: 480px;
  //         }
  //         #autocomplete {
  //           position: absolute;
  //           top: 0px;
  //           left: 0px;
  //           width: 99%;
  //         }
  //         .label {
  //           text-align: right;
  //           font-weight: bold;
  //           width: 100px;
  //           color: #303030;
  //           font-family: "Roboto";
  //         }
  //         #address {
  //           border: 1px solid #000090;
  //           background-color: #f0f9ff;
  //           width: 480px;
  //           padding-right: 2px;
  //         }
  //         #address td {
  //           font-size: 10pt;
  //         }
  //         .field {
  //           width: 99%;
  //         }
  //         .slimField {
  //           width: 80px;
  //         }
  //         .wideField {
  //           width: 200px;
  //         }
  //         #locationField {
  //           height: 20px;
  //           margin-bottom: 2px;
  //         }
  //         `}
  //       </style>
  //     </head>
  //     <body>
  //       <div id="locationField">
  //         <input id="autocomplete" placeholder="Enter your address" onFocus={geolocate} type="text" />
  //       </div>
  //       <table id="address">
  //         <tbody>
  //           <tr>
  //             <td className="label">Street address</td>
  //             <td className="slimField"><input className="field" id="street_number" disabled /></td>
  //             <td className="wideField" colSpan="2"><input className="field" id="route" disabled /></td>
  //           </tr>
  //           <tr>
  //             <td className="label">City</td>
  //             <td className="wideField" colSpan="3"><input className="field" id="locality" disabled /></td>
  //           </tr>
  //           <tr>
  //             <td className="label">State</td>
  //             <td className="slimField"><input className="field" id="administrative_area_level_1" disabled /></td>
  //             <td className="label">Zip code</td>
  //             <td className="wideField"><input className="field" id="postal_code" disabled /></td>
  //           </tr>
  //           <tr>
  //             <td className="label">Country</td>
  //             <td className="wideField" colSpan="3"><input className="field" id="country" disabled /></td>
  //           </tr>
  //         </tbody>
  //       </table>
  //       <div id="map"></div>
  //     </body>
  //   </html>
  // );
};

export default TryHtml;

