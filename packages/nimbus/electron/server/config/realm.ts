import Realm from "realm";
import { MockApiDataSchema } from "../models/mockApiDataSchema";
import { RequestMetadataSchema } from "../models/requestMetadata";


function realm() {
    return new Realm({
      schema: [MockApiDataSchema, RequestMetadataSchema],
      path: "mockApiData.realm",
    });
  }
  
export {realm};