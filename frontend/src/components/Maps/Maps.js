import React from 'react';
import { useJsApiLoader } from '@react-google-maps/api'

import styles from './Maps.module.css'

  const Maps = ({ apiKey, spot }) => {
    const { isLoaded } = useJsApiLoader({
      id: 'google-map-script',
      googleMapsApiKey: apiKey,
    });
    
    return (
      <>
        {isLoaded && (
          <>
            <h3>Where you'll be</h3>
            <div className={styles.mapContainer}>
              <iframe
              className={styles.map}
              title='location-map'
              src={`https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${spot.city}+${spot.state}`}>
              </iframe>
              <span className={styles.location}>{spot.city}, {spot.state}, {spot.country}</span>
              <span>A diam maecenas sed enim. Gravida in fermentum et sollicitudin ac orci phasellus egestas. Id ornare arcu odio ut sem nulla pharetra. Risus feugiat in ante metus dictum at tempor. Purus non enim praesent elementum facilisis leo. Nulla facilisi nullam vehicula ipsum. Arcu felis bibendum ut tristique et egestas quis ipsum suspendisse. Enim sed faucibus turpis in eu mi bibendum. Netus et malesuada fames ac.</span>
            </div>
          </>
        )}
      </>
    );
  };
  
  export default React.memo(Maps);
