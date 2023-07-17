import mapboxgl from 'mapbox-gl';

type Point = {
  lat: number;
  lng: number;
};

export const maps = {
  init: (onDone: () => void) => {},
  getBoundingBox(points: Point[]): [[number, number], [number, number]] {
    if (points.length === 0) {
      return [
        [0, 0],
        [0, 0],
      ];
    }

    let topLeft = { ...points[0] };
    let bottomRight = { ...points[0] };

    for (const point of points) {
      if (point.lat > topLeft.lat) {
        topLeft.lat = point.lat;
      }
      if (point.lng < topLeft.lng) {
        topLeft.lng = point.lng;
      }
      if (point.lat < bottomRight.lat) {
        bottomRight.lat = point.lat;
      }
      if (point.lng > bottomRight.lng) {
        bottomRight.lng = point.lng;
      }
    }
    const padding = 0.2;
    return [
      [topLeft.lat - padding, topLeft.lng - padding],
      [bottomRight.lat + padding, bottomRight.lng + padding],
    ];
  },
};
