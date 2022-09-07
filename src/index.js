import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import "./index.css";
// import { propagate, gstime, eciToGeodetic, radiansToDegrees } from 'satellite.js';
// let xa = satellite.propagate(satrec, new Date());
// console.log(xa);
// export function getSatelliteLocation(satrec, date, start) {
//   const propagation = propagate(satrec, date);
//   const position = propagation?.position;
//   if (!position || Number.isNaN(position.x) || Number.isNaN(position.y) || Number.isNaN(position.z)) {
//     return null;
//   }
//   if (!start) {
//     start = date;
//   }
//   const gmst = gstime(start);
//   const geographic = eciToGeodetic(position, gmst);
//   const { longitude, latitude, height } = geographic;

//   const x = radiansToDegrees(longitude);
//   const y = radiansToDegrees(latitude);
//   const z = height * 1000;
//   return { x, y, z };
// }

// import { twoline2satrec, propagate, gstime, eciToGeodetic, radiansToDegrees } from 'satellite.js';
// let line1 = "1 52765U 22057AK  22219.83245527  .00001828  00000+0  10527-3 0  9999";
// let line2 = "2 52765  97.5258 333.9074 0012579 340.5203 178.2137 15.13625719 11206";
// // let line1 = "1 25994U 99068A   22192.16952012  .00000246  00000+0  64342-4 0  9997";
// // let line2 = "2 25994  98.1361 263.5453 0001353 100.4260 344.0443 14.57155209200072"
// let satrec = twoline2satrec(line1, line2);
//console.log(satrec);
//const positionAndVelocity = sgp4(satrec, new Date());
//console.log(positionAndVelocity);
//let date = new Date();
// const propagation = propagate(satrec, new Date());
//let date = new Date();
// const propagation = propagate(satrec, date);
// const position = propagation.position;
// console.log(propagation)
// console.log(date);
// const gmst = gstime(date);
// const loc = eciToGeodetic(position, gmst);
// console.log(loc);
/* getSatellite function */
//let loc = {}
// export function getSatelliteLocation(satrec, date, start) {
//   const propagation = propagate(satrec, date);
//   const position = propagation?.position;
//   if (!position || Number.isNaN(position.x) || Number.isNaN(position.y) || Number.isNaN(position.z)) {
//     return null;
//   }
//   if (!start) {
//     start = date;
//   }
//   const gmst = gstime(start);
//   const geographic = eciToGeodetic(position, gmst);
//   const { longitude, latitude, height } = geographic;
//   const x = radiansToDegrees(longitude);
//   const y = radiansToDegrees(latitude);
//   const z = height * 1000;
//   console.log({ x, y, z });
//   loc.x = x;
//   loc.y = y;
//   loc.z = z;
//   return loc;
// }
//getSatelliteLocation(satrec, new Date(), new Date())

//console.log(propagation);
// const position = propagation.position;
// const gmst = gstime(new Date());
// const loc = eciToGeodetic(position, gmst);
// console.log(loc);
//console.log(loc)

// const rootElement = document.getElementById('root');
// const root = createRoot(rootElement);
// const map = new Map({
//   basemap: "hybrid"
// });

// root.render(
//   // <div id="viewDiv">
//   <Scene style={{ width: '100vw', height: '100vh' }}
//     mapProp={map}
//     viewProperties={{
//       center: [40.02, 42.02],
//       zoom: 2
//     }} >
//     {/* <BermudaTriangle /> */}
//     <ListSatellite />
//     {/* <SatelliteLayer /> */}
//     <SatelliteTest graphicProperties={{
//         line1: "1 52765U 22057AK  22219.83245527  .00001828  00000+0  10527-3 0  9999",
//         line2: "2 52765  97.5258 333.9074 0012579 340.5203 178.2137 15.13625719 11206",
//       }} />

//     <MyFeatureLayer
//       featureLayerProperties={{
//         //url: 'https://services.arcgis.com/P3ePLMYs2RVChkJx/arcgis/rest/services/World_Time_Zones/FeatureServer/0'
//         url: "https://services4.arcgis.com/XZEtqni2CM1tP1ZM/arcgis/rest/services/Armenia/FeatureServer",
//         renderer: {
//           type: "simple",
//           symbol: {
//             type: "simple-fill",
//             color: [255, 0, 0, 0],
//             outline: {
//               color: [255, 0, 0, 1],
//               width: 2
//             }
//           }
//         }
//       }}
//     >
//     </MyFeatureLayer>
//   </Scene>
// );

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
