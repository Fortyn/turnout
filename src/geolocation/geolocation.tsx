import React from "react";
import {GeolocatedProps, geolocated} from "react-geolocated";
import {Coords} from "./location-provider";

export interface GeolocationProps {
    setCoords: React.Dispatch<React.SetStateAction<Coords | undefined>>
}

const GeolocationComponent: React.FunctionComponent<GeolocatedProps & GeolocationProps> = (props) => {

    React.useEffect(()=>{
        if (!props.isGeolocationEnabled || !props.coords) {
            return;
        }
        //console.log(props.coords);
        props.setCoords(prevState => {
            const prevPoint = {
                latitude: prevState?.latitude,
                longitude: prevState?.longitude
            }
            const newPoint = {
                latitude: props.coords?.latitude,
                longitude: props.coords?.longitude
            }
            const distance = prevState ? distanceBetween(prevPoint as Point, newPoint as Point) : 0;
            return {
                distance,
                latitude: props.coords?.latitude,
                longitude: props.coords?.longitude,
                altitude: props.coords?.altitude
            } as Coords;
        })
    }, [props.coords, props.isGeolocationEnabled]);
    return null;

}

interface Point {
    latitude: number,
    longitude: number
}

const R = 6372795;
const distanceBetween = (first: Point, second: Point): number => {
    console.log("Distance");
    const lat1 = rad(first.latitude);
    const lat2 = rad(second.latitude);
    const long1 = rad(first.longitude);
    const long2 = rad(second.longitude);
    const cl1 = Math.cos(lat1);
    const cl2 = Math.cos(lat2);
    const sl1 = Math.sin(lat1);
    const sl2 = Math.sin(lat2);
    const delta = long2 - long1;
    const cdelta = Math.cos(delta);
    const sdelta = Math.sin(delta);
    const y = Math.sqrt(Math.pow(cl2 * sdelta, 2)
        + Math.pow(cl1 * sl2 - sl1 * cl2 * cdelta, 2));
    const x = sl1 * sl2 + cl1 * cl2 * cdelta;
    const ad = Math.atan2(y, x);
    return ad * R;
}
const rad = (a: number) => Math.PI / 180 * a;

export const Geolocation = geolocated({
    positionOptions: {
        enableHighAccuracy: true,
    }
})(GeolocationComponent);