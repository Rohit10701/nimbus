// src/sagas/dataSaga.ts
import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchDataRequest, fetchDataSuccess, fetchDataFailure } from '../slices/mockApiSlice';

// Simulated API call
function fetchDataApi() {
  return fetch('https://api.example.com/data')
    .then((response) => response.json())
    .catch((error) => { throw error });
}

// Define the saga to fetch data
function* fetchData() {
  try {
    const data: string[] = yield call(fetchDataApi);
    yield put(fetchDataSuccess(data));
  } catch (error: any) {
    yield put(fetchDataFailure(error.toString()));
  }
}

// Watcher saga that watches for fetchDataRequest action
export default function* watchFetchData() {
  yield takeLatest(fetchDataRequest.type, fetchData);
}
