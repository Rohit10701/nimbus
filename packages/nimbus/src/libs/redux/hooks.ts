import { useDispatch } from 'react-redux';
import type { AppDispatch } from './store';

// Define a custom hook for dispatch
export const useAppDispatch: () => AppDispatch = useDispatch;
