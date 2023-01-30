import React from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'

const containerStyle = {
    width: '600px',
    height: '400px',
  };
  
  const Maps = ({ apiKey, spot }) => {
    const { isLoaded } = useJsApiLoader({
      id: 'google-map-script',
      googleMapsApiKey: apiKey,
    });
    
    const center = {
      lat: spot.lat,
      lng: spot.lng,
    };
    
    return (
      <>
        {isLoaded && (
          // <GoogleMap
          //   mapContainerStyle={containerStyle}
          //   center={center}
          //   zoom={10}
          // />
        <iframe
        // id='map'
        // className='embed-map'
        title='location-map'
        src={`https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${spot.city}+${spot.state}`}>
        </iframe>
        )}
      </>
    );
  };
  
  export default React.memo(Maps);