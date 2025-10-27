import React, { useState } from "react";
import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { useLocalization } from "@/contexts/LocalizationContext";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const LocationSection = () => {
  const { t, isRtl } = useLocalization();
  
  // Dummy locations with coordinates and names
  const locations = [
    { id: 1, name: "شركة أفنية للإستشارات الهندسية | Afniah Engineering Consultants", lat: 26.367352070998177, lng: 50.186201829520016 },
  ];

  // State for map center and zoom
  const [mapCenter, setMapCenter] = useState({ lat: 26.367352070998177, lng: 50.186201829520016 });
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
            <h2 className="text-4xl lg:text-5xl text-green-primary leading-tight font-light">
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
        </div>
      </div>
    </motion.section>
  );
};

export default LocationSection;