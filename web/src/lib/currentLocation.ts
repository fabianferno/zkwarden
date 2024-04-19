import { useState, useEffect } from "react";
import axios from "axios";

interface LocationData {
  ip: string;
  city: string;
  region: string;
  country: string;
  latitude: string;
  longitude: string;
}

const getLocation = async (): Promise<LocationData | null> => {
  try {
    const response = await axios.get<LocationData>("https://ipapi.co/json");
    return response.data;
  } catch (error) {
    console.error("Error fetching location:", error);
    return null;
  }
};

const useLocation = (): LocationData | null => {
  const [currLocation, setCurrLocation] = useState<LocationData | null>(null);

  useEffect(() => {
    getLocation().then((locationData) => {
      if (locationData) {
        setCurrLocation(locationData);
        console.log(locationData);
      }
    });
  }, []);

  return currLocation;
};

export default useLocation;
