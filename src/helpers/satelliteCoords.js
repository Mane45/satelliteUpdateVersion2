import {propagate, gstime, eciToGeodetic, radiansToDegrees } from 'satellite.js';

function getSatelliteLocation(satrec, date, start) {
    const propagation = propagate(satrec, date);
    const position = propagation?.position;
    if (!position || Number.isNaN(position.x) || Number.isNaN(position.y) || Number.isNaN(position.z)) {
        return null;
    }
    if (!start) {
        start = date;
    }
    const gmst = gstime(start);
    const geographic = eciToGeodetic(position, gmst);
    const { longitude, latitude, height } = geographic;
    const x = radiansToDegrees(longitude);
    const y = radiansToDegrees(latitude);
    const z = height * 1000;
    return { x, y, z };
}

export {getSatelliteLocation}