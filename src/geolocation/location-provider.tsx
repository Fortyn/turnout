import React, {useState, useRef} from "react";
import {Geolocation} from "./geolocation";

export interface Coords {
    distance: number
    latitude: number
    longitude: number
    altitude: number
};

interface LocationStore {
    coords?: Coords
}

export const LocationContext = React.createContext<LocationStore>({});

export interface LocationManager {
    getLocation: () => void
}

export const LocationProvider: React.FunctionComponent<{}> = (props) => {
    const [coords, setCoords] = useState<Coords>();
    const geolocation = useRef(null);
    const getLocation = () => {
        const manager = geolocation.current
            ? geolocation.current
            : { getLocation: ()=>{alert("Location provider not specified");} };
        (manager as LocationManager).getLocation();
    }
    return (
        <LocationContext.Provider value={{
            coords
        }}>
            <Geolocation
                ref={geolocation}
                setCoords={setCoords}
            />
            <button
                onClick={getLocation}
            >
                LOCATION
            </button>
            <div>
                latitude: {coords?.latitude} <br/>
                longitude: {coords?.longitude}<br/>
                distance: {coords?.distance}<br/>
            </div>
            {props.children}
        </LocationContext.Provider>
    );
}