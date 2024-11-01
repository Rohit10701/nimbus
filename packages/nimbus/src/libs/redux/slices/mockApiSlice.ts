import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DataState {
  mockApiJsonSchemaRequestData?: string
  mockApiRequestMetaData?: MockApiMetadata
  mockApiResponse? : MockApiCreateResponse
  loading: boolean;
  error: string | null;
}

interface MockApiMetadata {
  limit? : number,
  version?  : number,
  delay?: number,
  errorRate? : number,
  errorCode?: number,
  authEnabled: boolean
}
interface MockApiCreateResponse {

}
const initialState: DataState = {
  mockApiJsonSchemaRequestData: undefined,
  mockApiRequestMetaData : {
    limit : undefined,
    version  : undefined,
    delay: undefined,
    errorRate : undefined,
    errorCode : undefined,
    authEnabled : false
  },
  mockApiResponse : {

  },
  loading: false,
  error: null,
};

const mockApiSlice = createSlice({
  name: 'mockApi',
  initialState,
  reducers: {
    saveMockApiRequestData: (state, action: PayloadAction<string | undefined>) => {
      state.mockApiJsonSchemaRequestData = action.payload;
    },
    saveMockApiRequestMetaData: (state, action: PayloadAction<MockApiMetadata | undefined>) => {
      state.mockApiRequestMetaData = action.payload;
    },
  },
});

export const { saveMockApiRequestData, saveMockApiRequestMetaData } = mockApiSlice.actions;
export default mockApiSlice.reducer;
