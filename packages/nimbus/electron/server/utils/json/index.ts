import parseJson, { JSONError } from "parse-json";
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
                        return generateRandomDataForFields(JSON.parse(JSON.stringify(value[0])) as keyof Fields);
                    } else {
                        return generateTheMockDataFromSchema(JSON.parse(JSON.stringify(value[0])) as JsonObjectType);
                    }
                });
            } else {
                data[key] = generateTheMockDataFromSchema(JSON.parse(JSON.stringify(value)) as JsonObjectType);
            }
        } else if (typeof value === "string" && generateRandomDataForFields(value as keyof Fields)) {
            data[key] = generateRandomDataForFields(JSON.parse(JSON.stringify(value)) as keyof Fields);
        }
    }
    return data;
}


export function parseJsonData(jsonData : string) {
    try {
        console.log({jsonData})
        const data = JSON.parse(jsonData) as unknown as JsonObjectType[]
        return {data : data, error : null}
    } catch (error) {
        if(error instanceof JSONError){
            return {data : null, error}
        }
        return {data : null, error : {message : "Internal Server Error"}}
    }
}