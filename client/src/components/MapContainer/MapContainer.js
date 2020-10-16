import React, { useState, useEffect } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import API from "../../utils/API";

export function MapContainer(props) {
  let [latitude, setLatitude] = useState();
  let [longitude, setLongitude] = useState();
  let [stores, setStores] = useState([]);

  let getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(showPosition);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  let showPosition = (position) => {
    var latlon = {
      lat: position.coords.latitude,
      lon: position.coords.longitude,
    };

    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
  };

  useEffect(() => {
    console.log(
      "props passed from result pages: ",
      props.itemToSearch,
      process.env.GOOGLE_MAP_API_KEY
    );
    getLocation();
    if (props.itemToSearch && latitude && longitude) {
      API.searchStore(latitude, longitude, props.itemToSearch).then(
        (searchResponse) => {
          console.log("response from api: ", searchResponse);
          let response = searchResponse.data;
          let newStore = [];
          for (var i = 0; i < response.results.length; i++) {
            //get locations from data
            let store = {};
            store.name = response.results[i].name;
            store.location = response.results[i].geometry.location;
            //console.log(store);
            newStore = [...newStore, store];
            setStores(newStore);
          }
        }
      );
    }
  }, [props.itemToSearch, latitude, longitude]);

  const style = {
    width: "100%",
    height: "100vh",
  };
  const containerStyle = {
    position: "relative",
    width: "100%",
    height: "100%",
    //height: '300px'
  };
  return (
    <div style={style}>
      <Map
        google={props.google}
        zoom={13}
        initialCenter={{
          lat: 40.854885,
          lng: -88.081807,
        }}
        center={{
          lat: parseFloat(latitude),
          lng: parseFloat(longitude),
        }}
        containerStyle={containerStyle}
      >
        {/* <Marker onClick={this.onMarkerClick}
                        name={'Current location'} />

                    <InfoWindow onClose={this.onInfoWindowClose}>
                        <div>
                            <h1>{this.state.selectedPlace.name}</h1>
                        </div>
                    </InfoWindow> */}
        <Marker
          position={{
            lat: parseFloat(latitude),
            lng: parseFloat(longitude),
          }}
          onClick={() => console.log("You clicked me!")}
          name="Current location"
          icon="http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
        >
          <InfoWindow>
            <div>
              <h1>Your Location</h1>
            </div>
          </InfoWindow>
        </Marker>

        {/* {()=>storeMarker()} */}

        {stores.map((marker, index) => (
          <Marker
            position={{
              lat: parseFloat(marker.location.lat),
              lng: parseFloat(marker.location.lng),
            }}
            key={index}
            title={marker.name}
          >
            <InfoWindow>
              <div>
                <h1>{marker.name}</h1>
              </div>
            </InfoWindow>
          </Marker>
        ))}
      </Map>
    </div>
  );
}

export default GoogleApiWrapper({
  apiKey: `${process.env.REACT_APP_GOOGLE_MAP_API_KEY}`,
})(MapContainer);
