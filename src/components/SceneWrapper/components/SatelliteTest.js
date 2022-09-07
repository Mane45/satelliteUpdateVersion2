import { useState, useEffect } from "react";
import { loadModules } from "esri-loader";
import { getSatelliteLocation } from "../../../helpers/satelliteCoords";
import { twoline2satrec } from "satellite.js";
let array
//let coordsArray = [];
const SatelliteTest = (props) => {
  let line1 = props.graphicProperties.line1;
  let line2 = props.graphicProperties.line2;
  let satrec = twoline2satrec(line1, line2);
  const [graphicState, setGraphicState] = useState(null);
  //const [polygonState, setPolygonState] = useState(null);
  //const [lineState, setLineState] = useState(null);
  //let asd = [];
  //let asdItem = {};
  let polyline;
  useEffect(() => {
    //let asd = [];
    let interval;
    loadModules(["esri/Graphic", "esri/layers/GraphicsLayer"])
      .then(([Graphic, GraphicsLayer]) => {
        //const polygonLayer = new GraphicsLayer();
        //props.view.graphics.remove(polyg);
        interval = setInterval(() => {
          let loc = getSatelliteLocation(satrec, new Date());
          //  asdItem.location = loc;
          // asd.push(asdItem);
          //asd[0] = 1032;
          //console.log(asd);
          const graphic = new Graphic({
            geometry: {
              type: "point",
              x: loc.x,
              y: loc.y,
              z: loc.z,
            },
            symbol: {
              type: "picture-marker",
              url: "https://developers.arcgis.com/javascript/latest/sample-code/satellites-3d/live/satellite.png",
              width: 48,
              height: 48
            }
          });
          let x1, x2, y1, y2;
          let width = 10,
            height = 5;
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
                color: [176, 252, 56],
                //color: [Math.floor(Math.random() * 250), Math.floor(Math.random() * 250), Math.floor(Math.random() * 250), 0.7],
                width: 2
              }
            }
          })

          polyline = new Graphic({
            geometry: {
              type: "polyline",
              paths: [
                [loc.x, loc.y, 0],
                [loc.x, loc.y, loc.z]
              ],
            },
            symbol: {
              type: "simple-line",
              color: [176, 252, 56, 1],
              width: 3
            }
          })
          //setLineState(polyline);
          //setPolygonState(polygontest);
          setGraphicState(graphic);

        }, 500);

        graphicState && props.view.graphics.add(graphicState);
        //polygonState && props.view.graphics.add(polygonState);
        //lineState && props.view.graphics.add(lineState);

        let x = document.getElementsByClassName("polygon");
        array = Object.keys(x)
          .map(function (key) {
            return x[key];
          });

        // array.forEach(item => {
        //   item.addEventListener("click", (e) => {
        //     //console.log(line);
        //     //olyg && props.view.graphics.remove(polyg);
        //     //console.log(e.target.parentElement.children[1].textContent);
        //     if (e.target.parentElement.children[0].checked) {
        //       polyg && props.view.graphics.add(polyg);
        //       lineState && props.view.graphics.add(lineState);
              
        //     }
        //   })
        //});


      })
      .catch((err) => console.error(err));

    setInterval(
      () => {
        graphicState && props.view.graphics.remove(graphicState);
        //polygonState && props.view.graphics.remove(polygonState);
        //lineState && props.view.graphics.remove(lineState);
        // array.forEach(item => {
        //   item.addEventListener("click", (e) => {
        //     //graphicState && props.view.graphics.remove(polyg);
        //     polyg && props.view.graphics.remove(polyg);
        //     lineState && props.view.graphics.remove(lineState);

        //   })
        //});
      },
      500
    );
    return () => {
      clearInterval(interval);
      clearInterval(
        () => {
          graphicState && props.view.graphics.remove(graphicState);
          //polygonState && props.view.graphics.remove(polygonState);
          //lineState && props.view.graphics.remove(lineState);
        },
        500
      );
    };
  }, [graphicState, 
    //polygonState, lineState, 
    props.view.graphics, satrec]);

  return null;
};

export default SatelliteTest;
