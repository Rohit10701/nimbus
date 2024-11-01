import { RootState } from './store'; // Ensure RootState is imported for typing


/* mockApi */

export const selectLoading = (state: RootState) => state.data.loading;
export const selectError = (state: RootState) => state.data.error;
export const selectMockApiJsonSchema = (state: RootState) => state.data.mockApiJsonSchemaRequestData;


