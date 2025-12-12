import React, { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { useLocalization } from "@/contexts/LocalizationContext";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const LocationSection = ({ location }) => {
  // Parse coordinates directly from location prop
  const latitude = location?.latitude ? parseFloat(location.latitude) : 24.7136;
  const longitude = location?.longitude ? parseFloat(location.longitude) : 46.6753;

  // State for map center and zoom
  const [mapCenter, setMapCenter] = useState({ lat: latitude, lng: longitude });
  const [zoom, setZoom] = useState(13);

  // Update map center when location changes
  useEffect(() => {
    if (location?.latitude && location?.longitude) {
      const newLat = parseFloat(location.latitude);
      const newLng = parseFloat(location.longitude);
      
      setMapCenter({ lat: newLat, lng: newLng });
      
      console.log("Latitude:", newLat);
      console.log("Longitude:", newLng);
    }
  }, [location]);

  // Locations array with current coordinates
  const locations = [
    { 
      id: 1, 
      name: "شركة أفنية للإستشارات الهندسية | Afniah Engineering Consultants", 
      lat: latitude, 
      lng: longitude 
    },
  ];

  // Handle marker click to zoom to location
  const handleMarkerClick = (loc) => {
    setMapCenter({ lat: loc.lat, lng: loc.lng });
    setZoom(15); // Fixed zoom level instead of incrementing
  };

  // Map container style
  const mapContainerStyle = {
    width: "100%",
    height: "400px",
    borderRadius: "15px",
    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
  };

  return (
    <motion.section
      className="bg-stone-50 py-16"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Header Section */}
        <motion.div
          className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-16 gap-6"
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="max-w-2xl">
            <h2 className="text-4xl lg:text-5xl text-green-primary leading-tight font-light">
              {location?.title || "Our Location"}
            </h2>
          </div>
          {location?.btn_link && (
            <a className="btn-primary" target="_blank" rel="noopener noreferrer" href={location.btn_link}>
              {location?.btn_text || "View on Map"}
            </a>
          )}
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-12 items-start">
          {/* Google Map */}
          <motion.div
            className="lg:col-span-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            viewport={{ once: true }}
          >
            <LoadScript googleMapsApiKey="AIzaSyAOVYRIgupAurZup5y1PRh8Ismb1A3lLao">
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={mapCenter}
                zoom={zoom}
                options={{
                  mapTypeControl: false,
                  streetViewControl: false,
                }}
              >
                {locations.map((loc) => (
                  <Marker
                    key={loc.id}
                    position={{ lat: loc.lat, lng: loc.lng }}
                    title={loc.name}
                    onClick={() => handleMarkerClick(loc)}
                  />
                ))}
              </GoogleMap>
            </LoadScript>
            {location?.message && (
              <p className="text-gray-600 leading-relaxed mt-6">
                {location.message}
              </p>
            )}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default LocationSection;