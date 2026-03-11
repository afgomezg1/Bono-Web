import { Property } from "@/modules/properties/types/property.type";

const DATA_URL =
  "https://gist.githubusercontent.com/caev03/cbe7d4f67f4f3655f876df7b312f9e0c/raw/483c4a692d5836457351c59a37c3f029d9711f5f/apartaments.json";

export const fetchProperties = async (): Promise<Property[]> => {
  const response = await fetch(DATA_URL);
  if (!response.ok) {
    throw new Error(`Request error: ${response.status} ${response.statusText}`);
  }
  return response.json() as Promise<Property[]>;
};

export const fetchPropertyByIndex = async (
  index: number
): Promise<Property> => {
  const properties = await fetchProperties();
  if (index < 0 || index >= properties.length) {
    throw new Error("Property not found");
  }
  return properties[index];
};
