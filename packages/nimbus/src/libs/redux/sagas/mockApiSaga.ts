import { call, put, takeLatest } from 'redux-saga/effects';
import { requestCreateMockApi, saveMockApiRequestData, saveMockApiRequestMetaData } from '../slices/mockApiSlice';
import axios from 'axios';
import { BACKEND_NODE_SERVER_ENDPOINT } from '../../../utils/constants';
import { PayloadAction } from '@reduxjs/toolkit';

const createMockApi = async (jsonSchemaPayload: string)  => {
  const res = await axios.post(`${BACKEND_NODE_SERVER_ENDPOINT}/mockSchemaApi`, 
    {
      schema: jsonSchemaPayload,
      metadata: {
        limit: 10,
        version: 2,
        delay: 200,
        errorRate: 10,
        errorCode: 500,
        authEnabled: true
      }
    }
  );
  return res.data;
}

function* fetchData(action: PayloadAction<string>) {
  try {
    // yield put({ type: 'mockApi/loading', payload: true });
    
    const response = yield call(createMockApi, action.payload);
    
    yield put(saveMockApiRequestData(response.schema));
    yield put(saveMockApiRequestMetaData(response.metadata));
    
    // yield put({ type: 'mockApi/loading', payload: false });
  } catch (error: any) {
    // yield put({ type: 'mockApi/error', payload: error.message });
    // yield put({ type: 'mockApi/loading', payload: false });
  }
}

export default function* watchFetchData() {
  yield takeLatest(requestCreateMockApi.type, fetchData);
}
