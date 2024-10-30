import { JsonObjectType } from "../../types/json";
import { Fields } from "../../types/mock/mockDataTemplate";
import { generateRandomDataForFields } from "../mock/generateUserProfile";

export function generateTheMockDataFromSchema(data: JsonObjectType): JsonObjectType {
    for (let key of Object.keys(data)) {
        const value = data[key];

        if (typeof value === "object" && value !== null) {
            if (Array.isArray(value)) {
                const arrayLength = 3; 
                data[key] = Array.from({ length: arrayLength }, () => {
                    if (typeof value[0] === "string") {
                        return generateRandomDataForFields(value[0] as keyof Fields);
                    } else {
                        return generateTheMockDataFromSchema(value[0] as JsonObjectType);
                    }
                });
            } else {
                data[key] = generateTheMockDataFromSchema(value as JsonObjectType);
            }
        } else if (typeof value === "string" && generateRandomDataForFields(value as keyof Fields)) {
            data[key] = generateRandomDataForFields(value as keyof Fields);
        }
    }
    return data;
}