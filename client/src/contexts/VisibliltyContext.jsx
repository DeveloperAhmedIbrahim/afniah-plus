import axiosInstance from "@/lib/axios";
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

const VisiblityContext = createContext();

export const VisiblityProvider = ({ children }) => {
    const [visibility, setVisibility] = useState({});

    const getVisibility = async () => {
        try {
            const response = await axiosInstance.get(`/home/get-visibility`);
            setVisibility(response.data.visibility);
        } catch (error) {
            console.error('Fetch Visibility Error:', error);
            toast.error(`Failed to fetch visibility`);
        }
    };

    useEffect(() => {
        getVisibility();
    }, [visibility]);

    return (
        <VisiblityContext.Provider value={{ visibility, getVisibility }}>
            {children}
        </VisiblityContext.Provider>
    );
};

export const useVisibility = () => {
    const context = useContext(VisiblityContext);
    if (!context) throw new Error("useVisibility must be used within VisiblityProvider");
    return context;
};