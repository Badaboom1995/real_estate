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
  pointsList: any[];
  propertiesSelected?: any[];
  single?: boolean;
}

export const Map = observer((props: MapProps) => {
  const { mapRef, setMapRef, pointsList, single, propertiesSelected } = props;
  const [mapDone, setDone] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [propId, setId] = useState('0');
  const { SearchPageStore } = useContext(StoreContext);
  const property = SearchPageStore.getPropertyById(propId);

  useEffect(() => {
    const selectedIds = propertiesSelected?.map((prop) => prop.id) || [];
    const selectedPoints = pointsList.filter((point) =>
      selectedIds.includes(point.id),
    );
    const otherPoints = pointsList.filter(
      (point) => !selectedIds.includes(point.id),
    );

    const activeProperties = selectedPoints
      .map((property) => {
        if (!property.lat || !property.lon) return;
        const { lat, lon } = property;
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
      })
      .filter((item) => item);

    const allProperties = otherPoints
      .map((property) => {
        if (!property.lat || !property.lon) return;
        const { lat, lon } = property;
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
      })
      .filter((item) => item);

    const points = activeProperties.map((property) => ({
      lat: property?.geometry.coordinates[0] || 0,
      lng: property?.geometry.coordinates[1] || 0,
    }));
    const bounds = maps.getBoundingBox(points);
    if (mapRef) {
      try {
        mapRef
          .getSource('places')
          .setData({ type: 'FeatureCollection', features: allProperties });
        mapRef
          .getSource('activePlaces')
          .setData({ type: 'FeatureCollection', features: activeProperties });
      } catch (e) {
        console.log('map alert. See Map component');
      }
      mapRef?.fitBounds(bounds, { padding: 100, maxDuration: 2000 });
    }

    if (mapDone || !activeProperties.length) return;
    const lat: any = activeProperties[0]?.geometry.coordinates[0];
    const lon: any = activeProperties[0]?.geometry.coordinates[1];
    mapboxgl.accessToken =
      'pk.eyJ1IjoiYmFkYXZvbyIsImEiOiJjbGpwZmc3cjMxa2UxM2VreXQxYzh0MngyIn0.MxR2Hiaj3ppo3w_UyX3zWA';
    const map = new mapboxgl.Map({
      container: 'map',
      // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
      style: 'mapbox://styles/mapbox/streets-v12',
      // @ts-ignore
      // center: [lat, lon - 0.05] || [-69.5, 18.34],
      zoom: 11.15,
    });
    setMapRef(map);
    map.on('load', () => {
      map.addSource('places', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          // @ts-ignore
          features: allProperties,
        },
        // cluster: true,
        clusterMaxZoom: 14, // Max zoom to cluster points on
        clusterRadius: 50,
      });
      map.addLayer({
        id: 'places',
        type: 'circle',
        source: 'places',
        paint: {
          'circle-color': '#666',
          'circle-radius': 6,
          'circle-stroke-width': 2,
          'circle-stroke-color': '#ffffff',
        },
      });

      map.addSource('activePlaces', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          // @ts-ignore
          features: activeProperties,
        },
      });
      map.addLayer({
        id: 'activePlaces',
        type: 'circle',
        source: 'activePlaces',
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
      map.on('mouseenter', 'activePlaces', () => {
        map.getCanvas().style.cursor = 'pointer';
      });
      // Change it back to a pointer when it leaves.
      map.on('mouseleave', 'activePlaces', () => {
        map.getCanvas().style.cursor = '';
      });
    });
    setDone(true);
  }, [mapRef, pointsList, propertiesSelected]);

  useEffect(() => {
    if (!mapRef || single) return;
    mapRef.on('click', 'places', (e: any, features: any) => {
      setShowCard(true);
      setId(e.features[0].properties.id);
    });
    mapRef.on('click', 'activePlaces', (e: any, features: any) => {
      setShowCard(true);
      setId(e.features[0].properties.id);
    });
    return () => {
      mapRef.off('click', 'places');
      mapRef.off('click', 'activePlaces');
    };
  }, [showCard, mapRef]);

  return (
    <div id="map" className={'relative overflow-hidden h-[80vh]'}>
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
          <PropertyCard mapRef={props.mapRef} property={property} id={propId} />
        </div>
      )}
    </div>
  );
});
