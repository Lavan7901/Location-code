import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';

const mapContainerStyle = {
  width: '80%',
  height: '400px',
};

const options = {
  disableDefaultUI: true,
  zoomControl: true,
};

function Map() {
  const [location, setLocation] = useState(null);
  const [inputLat, setInputLat] = useState('');
  const [inputLng, setInputLng] = useState('');
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyBH5y2RuQZpcqSIkfuQpmn8uAybfCUE9zs',
  });

  useEffect(() => {
    const getCurrentLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            console.log('Location:', latitude, longitude);
            setLocation({ lat: latitude, lng: longitude });
          },
          (error) => {
            console.error('Error getting location:', error);
          }
        );
      } else {
        console.error('Geolocation is not found.');
      }
    };

    getCurrentLocation();
  }, []);

  const handleLocationSubmit = () => {
    if (inputLat && inputLng) {
      setLocation({ lat: parseFloat(inputLat), lng: parseFloat(inputLng) });
    }
  };

  if (loadError) return 'Error loading maps';
  if (!isLoaded) return 'Loading Maps...';

  return (
    <div className="map">
      <h1>Location</h1>
      <div className='field-item'>
        <input type="text" value={inputLat} placeholder='Latitude' onChange={(e) => setInputLat(e.target.value)} />
        <input type="text" value={inputLng} placeholder="Longtitude" onChange={(e) => setInputLng(e.target.value)} />
        <button onClick={handleLocationSubmit}>Submit</button>
      </div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={location}
        zoom={15}
        options={options}
      >
        {location && <Marker position={location} />}
      </GoogleMap>
    </div>
  );
}

export default Map;
