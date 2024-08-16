import { useState, useEffect, useRef } from "react";
import '../../index.css'
import {
    APIProvider, ControlPosition, MapControl, AdvancedMarker, Map, useMap, useMapsLibrary, useAdvancedMarkerRef, Marker,
} from "@vis.gl/react-google-maps";
const API_KEY = globalThis.GOOGLE_MAPS_API_KEY ?? "AIzaSyA7_v5dWYunLhct5AUUHHlHIJ92Py3CpKc"
const style={
    width: "40vw",
    height: "40vh",
    zIndex: 100,
}
export function LocationView ({location}) {
    console.log(location)
    let lat = parseFloat(location.split(",")[0])
    let lng = parseFloat(location.split(",")[1])
    try {
        return (
            <APIProvider
                apiKey={API_KEY}
                style={style}
            >
                <Map
                    mapId={"abc123"}
                    style={style}
                    defaultZoom={3}
                    defaultCenter={{ lat: lat, lng: lng }}
                    gestureHandling={"greedy"}
                    disableDefaultUI={true}
                >
                    <Marker position={{lat, lng}} />
                </Map>
            </APIProvider>
        );
    } catch {
        return <div>
            {Location}
        </div>
    }

}

export function LocationSelection({selectedPlace, setSelectedPlace}) {
    // const [selectedPlace, setSelectedPlace] = useState(null);
    const [markerRef, marker] = useAdvancedMarkerRef();

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
            fields: ["geometry", "name", "formatted_address", "geometry.location"],
        };

        setPlaceAutocomplete(new places.Autocomplete(inputRef.current, options));
    }, [places]);
    useEffect(() => {
        if (!placeAutocomplete) return;

        placeAutocomplete.addListener("place_changed", () => {
            onPlaceSelect(placeAutocomplete.getPlace());
            console.log(placeAutocomplete.getPlace().geometry.location.lat() + "," + placeAutocomplete.getPlace().geometry.location.lng());
        });
    }, [onPlaceSelect, placeAutocomplete]);
    return (
        <div className="autocomplete-container">
            <input ref={inputRef} />
        </div>
    );
};

