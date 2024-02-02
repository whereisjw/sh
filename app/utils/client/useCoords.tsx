import { useEffect, useState } from "react";

interface ICoords {
  latitude: number | null;
  longitude: number | null;
}

interface ICoordsPosition {
  coords: {
    latitude: number | null;
    longitude: number | null;
  };
}

export default function useCoords() {
  const [coords, setCoords] = useState<ICoords>({
    latitude: null,
    longitude: null,
  });

  const onSuccess = ({ coords: { latitude, longitude } }: ICoordsPosition) => {
    setCoords({ latitude: latitude, longitude: longitude });
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(onSuccess);
  }, []);

  return coords;
}
