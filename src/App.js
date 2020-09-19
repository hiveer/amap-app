import React, { useState, useEffect, useRef }from 'react';
import { Map, Markers } from 'react-amap';
import Autocomplete from 'react-amap-plugin-autocomplete';

import logo from './logo.svg';
import './App.css';

const randomPosition = () => ({
  longitude: 100 + Math.random() * 20,
  latitude: 30 + Math.random() * 20
});

const randomMarker = (len) => (
  Array(len).fill(true).map((e, idx) => ({
    position: randomPosition()
  }))
);

function App() {

  const [markers, setMarkers] = useState([]);
  const [center, setCenter] = useState(randomPosition());
  const textInput = useRef(null);

  const pluginProps = {
    input: 'address-input'   // optional
  };

  const selectfunc = (e) => {
    if(e.poi.location) {
      alert(`${e.poi.location.lng} ${e.poi.location.lat}`);
      textInput.current.style.cssText = "border-color: red";
    }
  };

  const refreshMarkers = () => {
    setMarkers(randomMarker(10))
  }

  useEffect( () => {
    setMarkers(randomMarker(10))
   }, []);

  return (
    <div>
      <div style={{width: '600px', height: '400px'}}>
        <Map plugins={['ToolBar']} center={center} amapkey={'788e08def03f95c670944fe2c78fa76f'} zoom={3}>
          <Autocomplete options={pluginProps} onSelect={(e)=>selectfunc(e)} placeholder='搜索'/>
          <Markers
            markers={markers}
          />
        </Map>
      </div>
      <input id="address-input" ref={textInput} />
      <button style={{margin: '50px'}} onClick={refreshMarkers}>Random Markers</button>
    </div>
  );
}

export default App;
