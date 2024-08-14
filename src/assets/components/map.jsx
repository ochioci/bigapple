// import {AdvancedMarker, APIProvider, Map, Marker, useMap, useMarkerRef} from "@vis.gl/react-google-maps";
// import {useEffect} from "react";

//
// export function MapView({locRef}) {
//     const style = {
//         width: "40vw",
//         height: "40vh",
//         background: "red"
//     }
//
//
//     return <div style={style}>
//         <APIProvider apiKey={API_KEY}>
//             <Map mapId={"0"} style={style} defaultZoom={12} defaultCenter={{lat: 53.54992, lng: 10.00678}}>
//                 <AdvancedMarker onDragEnd={
//                     (e) => {
//                         console.log(e.latLng.lat(), e.latLng.lng())
//                         locRef.current = e.latLng.lat() + "," + e.latLng.lng()
//                     }
//                 } draggable={true} position={{lat: 53.54992, lng: 10.00678}} />
//             </Map>
//         </APIProvider>
//     </div>
// }

import { useState, useEffect, useRef } from "react";
import '../../index.css'
import {
    APIProvider,
    ControlPosition,
    MapControl,
    AdvancedMarker,
    Map,
    useMap,
    useMapsLibrary,
    useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";
const API_KEY = globalThis.GOOGLE_MAPS_API_KEY ?? "AIzaSyA7_v5dWYunLhct5AUUHHlHIJ92Py3CpKc"
export function MapView({selectedPlace, setSelectedPlace}) {
    // const [selectedPlace, setSelectedPlace] = useState(null);
    const [markerRef, marker] = useAdvancedMarkerRef();
    const style={
        width: "40vw",
        height: "40vh",
        zIndex: 100,
    }
    return (
        <APIProvider
            apiKey={API_KEY}
            solutionChannel="GMP_devsite_samples_v3_rgmautocomplete"
            style={style}
        >
            <Map
                style={style}
                mapId={"bf51a910020fa25a"}
                defaultZoom={3}
                defaultCenter={{ lat: 22.54992, lng: 0 }}
                gestureHandling={"greedy"}
                disableDefaultUI={true}
            >
                <AdvancedMarker ref={markerRef} position={null} />
            </Map>
            <MapHandler place={selectedPlace} marker={marker} />
            <MapControl position={ControlPosition.TOP}>
                <div className="autocomplete-control">
                    <PlaceAutocomplete onPlaceSelect={setSelectedPlace} />
                </div>
            </MapControl>
        </APIProvider>
    );
};

const MapHandler = ({ place, marker }) => {
    const map = useMap();

    useEffect(() => {
        if (!map || !place || !marker) return;

        if (place.geometry?.viewport) {
            map.fitBounds(place.geometry?.viewport);
        }

        marker.position = place.geometry?.location;
    }, [map, place, marker]);
    return null;
};

const PlaceAutocomplete = ({ onPlaceSelect }) => {
    const [placeAutocomplete, setPlaceAutocomplete] = useState(null);
    const inputRef = useRef(null);
    const places = useMapsLibrary("places");

    useEffect(() => {
        if (!places || !inputRef.current) return;

        const options = {
            fields: ["geometry", "name", "formatted_address"],
        };

        setPlaceAutocomplete(new places.Autocomplete(inputRef.current, options));
    }, [places]);
    useEffect(() => {
        if (!placeAutocomplete) return;

        placeAutocomplete.addListener("place_changed", () => {
            onPlaceSelect(placeAutocomplete.getPlace());
        });
    }, [onPlaceSelect, placeAutocomplete]);
    return (
        <div className="autocomplete-container">
            <input ref={inputRef} />
        </div>
    );
};

