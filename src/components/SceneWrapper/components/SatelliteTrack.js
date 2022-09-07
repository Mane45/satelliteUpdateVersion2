import { useState, useEffect } from "react";
import { loadModules } from "esri-loader";
import { getSatelliteLocation } from "../../../helpers/satelliteCoords";
import { twoline2satrec } from "satellite.js";
//import { SatelliteData } from "../../configs/config";

const SatelliteTrack = (props) => {
    let line1 = props.graphicProperties.line1;
    let line2 = props.graphicProperties.line2;
    let satrec = twoline2satrec(line1, line2);
    const [trackState, setTrackState] = useState(null);
    useEffect(() => {
        //let name = e.target.parentElement.parentElement.children[1].textContent;
        loadModules(["esri/Graphic"])
            .then(([Graphic]) => {
                let trackFeatures = [];
                //console.log(SatelliteData);
                //Satellite
                // SatelliteData.forEach((item) => {
                //    // if (item.lines.name === name) {
                //         let satrec = twoline2satrec(item.lines.line1, item.lines.line2);
                for (let i = 0; i < 60 * 24; i++) {
                    let loc = null;
                    try {
                        loc = getSatelliteLocation(satrec, new Date(Date.now() + i * 1000 * 60));
                        //console.log(loc);
                    } catch (error) { }
                    if (loc != null) {
                        trackFeatures.push([loc.x, loc.y, loc.z])
                    }
                }
                //     //}
                //return trackFeatures
                // });
                const track = new Graphic({
                    geometry: {
                        type: "polyline",
                        paths: [trackFeatures]
                    },
                    symbol: {
                        type: "line-3d",
                        symbolLayers: [
                            {
                                type: "line",
                                material: {
                                    //color: [Math.floor(Math.random() * 250), Math.floor(Math.random() * 250), Math.floor(Math.random() * 250), 0.7]
                                    color: props.graphicProperties.color
                                },
                                size: 2
                            }
                        ]
                    }
                })
                setTrackState(track);
                props.view.graphics.add(track);
                
                return () => {
                    props.view.graphics.remove(track);
                }
            })
    }, [trackState])
    return null;
}


export default SatelliteTrack;