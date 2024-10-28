import express, { Request, Response } from 'express';
import cors from 'cors';
import parseJson, { JSONError } from 'parse-json';
import { JsonObjectType } from './types/json';
import { generateTheMockDataFromSchema } from './utils/json';




const app = express();

app.use(express.json());
app.use(cors());

app.use("/mockSchemaApi", )



export {app}
