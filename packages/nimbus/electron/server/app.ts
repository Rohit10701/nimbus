import express, { Request, Response } from 'express';
import cors from 'cors';
import parseJson, { JSONError } from 'parse-json';
import { Fields } from './types/mockData';
import { generateRandomDataForFields } from './utils/mockData/generateUserProfile';

type JsonObjectType = {
    [key: string]: keyof Fields | JsonObjectType;
};
// Function to generate mock data from schema based on predefined fields
function generateTheMockDataFromSchema(data: JsonObjectType): JsonObjectType {
    for (let key of Object.keys(data)) {
        const value = data[key] as JsonObjectType
        if (typeof value === "object" && value !== null) {
            data[key] = generateTheMockDataFromSchema(value) as JsonObjectType;
        } else if (generateRandomDataForFields(value)) {
            // If the value corresponds to a key in fields, assign a random value from that field
            data[key] = generateRandomDataForFields(value)
        }
    }
    return data;
}




// // Predefined fields for mock data
// const fields: Fields = {
//     "$firstname": ["josh", "kyle", "anna", "james", "karl"],
//     "$lastname": ["wattson", "alan", "bond", "maddy", "tyler"],
//     "$age": [25, 30, 22, 28, 35],
//     "$email": [
//         "josh@example.com",
//         "kyle@example.com",
//         "anna@example.com",
//         "james@example.com",
//         "karl@example.com"
//     ],
//     "$city": ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix"],
//     "$occupation": ["Engineer", "Designer", "Doctor", "Teacher", "Chef"],
//     "$hobby": ["Reading", "Traveling", "Gaming", "Cooking", "Hiking"]
// };


// Main server function
const mainServer = async () => {
    const server = express();
    const PORT = 3000;

    server.use(express.json());
    server.use(cors());

    // A simple route
    server.get('/', (req: Request, res: Response) => {
        res.send('Hello, World!');
    });

    server.post('/', (req: Request, res: Response) => {
        try {
            // Parse the incoming JSON and generate mock data
            const jsonData  = parseJson(req.body.data) as JsonObjectType
            const mockData = generateTheMockDataFromSchema(jsonData);
            console.log(JSON.stringify(mockData, null, 2)); // Log the generated mock data
            
            res.json({ mockData }); // Send the mock data back in the response
        } catch (error) {
            if (error instanceof JSONError) {
                console.log({ error });
                res.status(400).json({ error: "Invalid JSON format" });
            } else {
                res.status(500).json({ error: "Internal Server Error" });
            }
        }
    });

    // Start the server
    server.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
};

export default mainServer;
