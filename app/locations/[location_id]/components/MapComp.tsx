'use client';
import React, { useRef, useState } from 'react';
import { Map } from '@/components/Map';

const MapComp = () => {
  const ref = useRef();
  const [mapRef, setMapRef] = useState();
  return (
    <div>
      <Map single mapRef={ref} setMapRef={setMapRef} pointsList={[location]} />
    </div>
  );
};

export default MapComp;
