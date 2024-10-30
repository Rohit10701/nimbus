/**
 * Delays execution for the specified duration.
 * @param ms The number of milliseconds to sleep
 * @throws {Error} If ms is negative or not a finite number
 * @returns Promise that resolves after the specified duration
 */
export const sleep = (ms: number): Promise<void> => {
  if (ms < 0 || !Number.isFinite(ms)) {
    throw new Error('Sleep duration must be a positive finite number');
  }
  if (ms > 30000) { // 30 seconds max delay
    console.warn('Long sleep duration detected. Consider reducing the delay.');
  }
  return new Promise(resolve => setTimeout(resolve, ms));
};
