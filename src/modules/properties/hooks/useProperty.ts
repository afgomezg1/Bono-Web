"use client";

import { useState, useEffect } from "react";
import { Property } from "@/modules/properties/types/property.type";
import { fetchPropertyByIndex } from "@/modules/properties/services/property.service";

export function useProperty(index: number) {
  const [property, setProperty] = useState<Property | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProperty = async () => {
      try {
        setIsLoading(true);
        const data = await fetchPropertyByIndex(index);
        setProperty(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setIsLoading(false);
      }
    };
    loadProperty();
  }, [index]);

  return { property, isLoading, error };
}
