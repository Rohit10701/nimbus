import express from "express"
import {createMockApi, getMockApi, deleteMockApi, listMockApis} from "../controller/mockSchemaController"

const mockApiRouter = express.Router();

mockApiRouter.post('/', createMockApi);
mockApiRouter.get('/:id', getMockApi);
mockApiRouter.get('/', listMockApis);
mockApiRouter.delete('/', deleteMockApi)

export {mockApiRouter};