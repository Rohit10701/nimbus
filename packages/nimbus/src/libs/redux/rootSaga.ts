// src/sagas/rootSaga.ts
import { all } from 'redux-saga/effects';
import watchFetchData from './sagas/mockApiSaga';

// Combine all sagas in root saga
export default function* rootSaga() {
  yield all([watchFetchData()]);
}
