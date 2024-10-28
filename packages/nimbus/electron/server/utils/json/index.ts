import { JsonObjectType } from "../../types/json";
import { Fields } from "../../types/mock/mockData";
import { generateRandomDataForFields } from "../mock/generateUserProfile";

// Function to generate mock data from schema based on predefined fields
export function generateTheMockDataFromSchema(data: JsonObjectType): JsonObjectType {
    for (let key of Object.keys(data)) {
        const value = data[key];

        // Check if the value is an object (nested schema)
        if (typeof value === "object" && value !== null) {
            if (Array.isArray(value)) {
                // If the value is an array, generate an array of mock data based on array length
                const arrayLength = 3; // Default to 3 items if array is empty
                data[key] = Array.from({ length: arrayLength }, () => {
                    if (typeof value[0] === "string") {
                        // If the first item is a key in Fields, generate random data for each array element
                        return generateRandomDataForFields(value[0] as keyof Fields);
                    } else {
                        // Otherwise, recurse into the nested object structure
                        return generateTheMockDataFromSchema(value[0] as JsonObjectType);
                    }
                });
            } else {
                // If value is an object, recurse into nested structure
                data[key] = generateTheMockDataFromSchema(value as JsonObjectType);
            }
        } else if (typeof value === "string" && generateRandomDataForFields(value as keyof Fields)) {
            // If value corresponds to a key in Fields, assign a random value from that field
            data[key] = generateRandomDataForFields(value as keyof Fields);
        }
    }
    return data;
}