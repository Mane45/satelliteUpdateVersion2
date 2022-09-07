import { useState, useEffect } from "react";
import { loadModules } from "esri-loader";
import { getSatelliteLocation } from "../../../helpers/satelliteCoords";
import { twoline2satrec } from "satellite.js";
import "./StelliteTest1.css";
let satelliteData = require("../../../configs/config.json");


const SatelliteTest1 = (props) => {
  let line1 = props.graphicProperties.line1;
  let line2 = props.graphicProperties.line2;
  let satrec = twoline2satrec(line1, line2);
  let width = props.graphicProperties.width;
  let height = props.graphicProperties.height;
  let name = props.graphicProperties.name;

  const [polygonState, setPolygonState] = useState(null);
  //const [polygonFutureState, setPolygonFutureState] = useState(null);
  const [lineState, setLineState] = useState(null);
 
  useEffect(() => {
    let interval;
    loadModules(["esri/Graphic", "esri/geometry/geometryEngine"])
      .then(([Graphic, geometryEngine]) => {
        let layer = props.map.layers.items[0];
        interval = setInterval(() => {
          let loc = getSatelliteLocation(satrec, new Date());

          // let locFuture = getSatelliteLocation(satrec, new Date(Date.now() + 600000));
          //console.log(loc);
          //console.log(locFuture);
          let x1, x2, y1, y2;
          // let xFuture1, xFuture2, yFuture1, yFuture2;
          // let width = 10,
          //   height = 5;
          if (loc.x < 0) {
            x1 = loc.x + +width;
            x2 = loc.x - +width;
          } else {
            x1 = loc.x - +width;
            x2 = loc.x + +width;
          }
          if (loc.y < 0) {
            y1 = loc.y - height;
            y2 = loc.y + height;
          } else {
            y1 = loc.y + height;
            y2 = loc.y - height;
          }
          const polygontest = new Graphic({
            geometry: {
              type: "polygon",
              rings: [
                [x1, y2],
                [x1, y1],
                [x2, y1],
                [x2, y2]
              ]
            },
            symbol: {
              type: "simple-fill",
              color: [227, 139, 79, 0],
              outline: {
                color: props.graphicProperties.color,
                //color: props.graphicProperties.color,
                //color: [176, 252, 56],
                //color: [Math.floor(Math.random() * 250), Math.floor(Math.random() * 250), Math.floor(Math.random() * 250), 0.7],
                width: 2
              }
            }
          })
          //let names = [];
          satelliteData.forEach((item) => {
            let loc = getSatelliteLocation(twoline2satrec(item.lines.line1, item.lines.line2), new Date(Date.now() + 600000)); 
            let x1, x2, y1, y2;
            if (loc.x < 0) {
              x1 = loc.x + +width;
              x2 = loc.x - +width;
            } else {
              x1 = loc.x - +width;
              x2 = loc.x + +width;
            }
            if (loc.y < 0) {
              y1 = loc.y - height;
              y2 = loc.y + height;
            } else {
              y1 = loc.y + height;
              y2 = loc.y - height;
            }
            const polygontestFuture = new Graphic({
              geometry: {
                type: "polygon",
                rings: [
                  [x1, y2],
                  [x1, y1],
                  [x2, y1],
                  [x2, y2]
                ]
              },
              symbol: {
                type: "simple-fill",
                color: [227, 139, 79, 0],
                outline: {
                  //color: props.graphicProperties.color,
                  color: [176, 252, 56],
                  //color: [Math.floor(Math.random() * 250), Math.floor(Math.random() * 250), Math.floor(Math.random() * 250), 0.7],
                  width: 2
                }
              }
            })
            layer.queryFeatures().then(result => {
              let isIntersecting1 = geometryEngine.intersects(result.features[0].geometry, polygontestFuture.geometry)
              //console.log(isIntersecting1)
              let text2 = document.getElementById("putText1");
              isIntersecting1 ? console.log("true"):console.log("false");
            });
          });

          const polyline = new Graphic({
            geometry: {
              type: "polyline",
              paths: [
                [loc.x, loc.y, 0],
                [loc.x, loc.y, loc.z]
              ],
            },
            symbol: {
              type: "simple-line",
              //color: [176, 252, 56, 1],
              color: props.graphicProperties.color,
              width: 3
            }
          })
          // if (locFuture.x < 0) {
          //   xFuture1 = locFuture.x + +width;
          //   xFuture2 = locFuture.x - +width;
          // } else {
          //   xFuture1 = locFuture.x - +width;
          //   xFuture2 = loc.x + +width;
          // }
          // if (locFuture.y < 0) {
          //   yFuture1 = locFuture.y - height;
          //   yFuture2 = locFuture.y + height;
          // } else {
          //   yFuture1 = locFuture.y + height;
          //   yFuture2 = locFuture.y - height;
          // }
          // const polygontestFuture = new Graphic({
          //   geometry: {
          //     type: "polygon",
          //     rings: [
          //       [xFuture1, yFuture2],
          //       [xFuture1, yFuture1],
          //       [xFuture2, yFuture1],
          //       [xFuture2, yFuture2]
          //     ]
          //   },
          //   symbol: {
          //     type: "simple-fill",
          //     color: [227, 139, 79, 0],
          //     outline: {
          //       color: [176, 252, 56],
          //       //color: [Math.floor(Math.random() * 250), Math.floor(Math.random() * 250), Math.floor(Math.random() * 250), 0.7],
          //       width: 2
          //     }
          //   }
          // })

          setLineState(polyline);
          setPolygonState(polygontest);
          //setPolygonFutureState(polygontestFuture);

        }, 500);
        polygonState && props.view.graphics.add(polygonState);
        lineState && props.view.graphics.add(lineState);
        /*intersection  geometries*/
        let isIntersecting;
        // let layer = props.map.layers.items[0];
        /*overlap */
        layer.queryFeatures().then(result => {
          let geometry0 = result.features[0].geometry;
          let geometry1 = props.view.graphics.items[3].geometry;
          return isIntersecting = geometryEngine.intersects(geometry0, geometry1);
        }).then((res) => {
          let text1 = document.getElementById("putText");
          document.getElementById("text").style.display = "block";
          res ? text1.innerHTML = `The ${name} satellite is overlap with Armenian boundary` : text1.innerHTML = `The selected ${name} satellite is not overlap width Armenian layer`;
        });
        /*estimate */
        // layer.queryFeatures().then(result => {
        //   let geometry0 = result.features[0].geometry;
        //   let geometry1 = polygonFutureState.geometry;
        //   return isIntersecting = geometryEngine.intersects(geometry0, geometry1);
        // }).then((res) => {
        //   let text2 = document.getElementById("putText1");
        //   res ? text2.innerHTML = `After 10 minutes the ${name} satellite will overlaps with layer boundary` : text2.innerHTML = ``;
        // });

      })
      .catch((err) => console.error(err));

    setInterval(
      () => {
        polygonState && props.view.graphics.remove(polygonState);
        lineState && props.view.graphics.remove(lineState);
      },
      500
    );
    return () => {
      clearInterval(interval);
      clearInterval(
        () => {
          polygonState && props.view.graphics.remove(polygonState);
          lineState && props.view.graphics.remove(lineState);
        },
        500
      );
    };
  }, [polygonState, lineState, props.view.graphics, satrec]);

  // return (
  //   <div id="overlap">
  //     <p id="overlapText"></p>
  //   </div>
  // );
  return null
};

export default SatelliteTest1;
