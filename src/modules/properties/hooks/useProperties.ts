"use client";

import { useState, useEffect } from "react";
import { Property } from "@/modules/properties/types/property.type";
import { fetchProperties } from "@/modules/properties/services/property.service";

export function useProperties() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProperties = async () => {
      try {
        setIsLoading(true);
        const data = await fetchProperties();
        setProperties(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setIsLoading(false);
      }
    };
    loadProperties();
  }, []);

  return { properties, isLoading, error };
}
