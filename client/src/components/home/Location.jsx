import React, { useState } from "react";
import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { useLocalization } from "@/contexts/LocalizationContext";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const LocationSection = () => {
  const { t, isRtl } = useLocalization();
  
  // Dummy locations with coordinates and names
  const locations = [
    { id: 1, name: "Location 1", lat: 37.7749, lng: -122.4194 },
    { id: 2, name: "Location 2", lat: 37.7849, lng: -122.4294 },
    { id: 3, name: "Location 3", lat: 37.7649, lng: -122.4094 },
    { id: 4, name: "Location 4", lat: 37.7949, lng: -122.3994 },
    { id: 5, name: "Location 5", lat: 37.7549, lng: -122.4394 },
  ];

  // State for map center and zoom
  const [mapCenter, setMapCenter] = useState({ lat: 37.7749, lng: -122.4194 });
  const [zoom, setZoom] = useState(12);

  // Handle marker click to zoom to location
  const handleMarkerClick = (location) => {
    setMapCenter({ lat: location.lat, lng: location.lng });
    setZoom(15);
  };

  // Map container style
  const mapContainerStyle = {
    width: "100%",
    height: "400px",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
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
            <h2 className="text-4xl lg:text-5xl font-serif text-green-primary leading-tight font-light">
              {t('location.title01')} — <br />
              <span className="italic">{t('location.title02')}</span>
            </h2>
          </div>
          <button className="btn-primary">
            {t('nav.contact')}
          </button>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-12 items-start">
          {/* Left Side - Google Map */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
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
                {locations.map((location) => (
                  <Marker
                    key={location.id}
                    position={{ lat: location.lat, lng: location.lng }}
                    title={location.name}
                    onClick={() => handleMarkerClick(location)}
                  />
                ))}
              </GoogleMap>
            </LoadScript>
            <p className="text-gray-600 leading-relaxed mt-6">
              {t('location.text')}
            </p>
          </motion.div>

          {/* Right Side - Benefits */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl lg:text-3xl font-serif text-golden-primary mb-8 font-light">
              {t('location.title03')}
            </h3>

            <div className="space-y-6">
              {t('location.points').map((benefit, index) => (
                <motion.div
                  key={index}
                  className="flex items-start space-x-4"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mt-1">
                    <Check className="w-4 h-4 text-green-600" />
                  </div>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {benefit}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default LocationSection;