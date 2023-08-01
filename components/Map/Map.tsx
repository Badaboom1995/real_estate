'use client';
import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { observer } from 'mobx-react-lite';
import { StoreContext } from '@/stores/StoreProvider';
import { maps } from '@/utils/maps';
import { PropertyCard } from '@/components/PropertyCard';
import { useUrlParams } from '@/hooks/useSearchParams';

interface MapProps {
  mapRef: any;
  setMapRef: (map: any) => void;
  propertiesList: any[];
  single?: boolean;
}

export const Map = observer((props: MapProps) => {
  const { mapRef, setMapRef, propertiesList, single } = props;
  const [mapDone, setDone] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [propId, setId] = useState('0');
  const { SearchPageStore } = useContext(StoreContext);
  const property = SearchPageStore.getPropertyById(propId);
  const searchParams = useUrlParams();

  useEffect(() => {
    const properties = propertiesList.map((property) => {
      if (!property.point) return;
      const [lat, lon] = property.point.split(',');
      return {
        type: 'Feature',
        properties: {
          id: property.id,
        },
        geometry: {
          type: 'Point',
          coordinates: [parseFloat(lon), parseFloat(lat)],
        },
        hover: true,
      };
    });

    const points = properties.map((property) => ({
      lat: property?.geometry.coordinates[0] || 0,
      lng: property?.geometry.coordinates[1] || 0,
    }));

    const bounds = maps.getBoundingBox(points);
    if (mapRef) {
      try {
        mapRef
          .getSource('places')
          .setData({ type: 'FeatureCollection', features: properties });
      } catch (e) {
        console.log(e);
      }
      mapRef.fitBounds(bounds, { padding: 100, maxDuration: 2000 });
      // mapRef.setCenter(properties[0]?.geometry.coordinates || [-69.5, 18.34]);
    }

    if (mapDone || !properties.length) return;
    mapboxgl.accessToken =
      'pk.eyJ1IjoiYmFkYXZvbyIsImEiOiJjbGpwZmc3cjMxa2UxM2VreXQxYzh0MngyIn0.MxR2Hiaj3ppo3w_UyX3zWA';
    const map = new mapboxgl.Map({
      container: 'map',
      // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
      style: 'mapbox://styles/mapbox/streets-v12',
      // @ts-ignore
      center: properties[0]?.geometry.coordinates || [-69.5, 18.34],
      zoom: 11.15,
    });
    setMapRef(map);
    map.on('load', () => {
      map.addSource('places', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          // @ts-ignore
          features: properties,
        },
      });
      // Add a layer showing the places.

      map.addLayer({
        id: 'places',
        type: 'circle',
        source: 'places',
        paint: {
          'circle-color': '#4264fb',
          'circle-radius': 6,
          'circle-stroke-width': 2,
          'circle-stroke-color': '#ffffff',
        },
      });

      // Change the cursor to a pointer when the mouse is over the places layer.
      map.on('mouseenter', 'places', () => {
        map.getCanvas().style.cursor = 'pointer';
      });

      // Change it back to a pointer when it leaves.
      map.on('mouseleave', 'places', () => {
        map.getCanvas().style.cursor = '';
      });
    });
    console.log('map loaded');
    setDone(true);
  }, [searchParams]);

  useEffect(() => {
    if (!mapRef || single) return;
    mapRef.on('click', 'places', (e: any, features: any) => {
      setShowCard(true);
      setId(e.features[0].properties.id);
    });
    return () => {
      mapRef.off('click', 'places');
    };
  }, [showCard, mapRef]);

  return (
    <div id="map" className={'relative overflow-hidden h-[70vh]'}>
      {showCard && (
        <div className="absolute left-[20px] top-[20px] bg-blue-400 w-[300px] rounded overflow-hidden">
          <button
            onClick={() => {
              setShowCard(false);
            }}
            className="absolute right-[10px] top-[10px] bg-white rounded-md p-[2px]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <PropertyCard mapRef={props.mapRef} property={property} />
        </div>
      )}
    </div>
  );
});
