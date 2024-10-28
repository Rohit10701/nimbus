import { sleep } from '..'
import { Response } from 'express'

export const simulateLatency = async (metadata: MockApiMetadata): Promise<void> => {
	const delay = metadata.delay || 0
	const distribution = metadata.latencyDistribution || 'constant'

	switch (distribution) {
        /*

            Most messages are delivered quickly (around 200 ms).
            Occasionally, messages might take longer (e.g., 240 ms, 280 ms, etc.).
            Users perceive the app as responsive most of the time, with a few noticeable delays that may lead to frustration.

        */
		case 'normal': {
			const std = delay * 0.2
			const normalDelay = Math.max(0, delay + boxMullerTransform() * std)
			await sleep(normalDelay)
			break
		}

        /*

            Most messages might be sent almost instantly (e.g., within 100-150 ms).
            However, there’s a significant chance of some messages taking longer (e.g., up to several seconds) due to server overload.
            Users might feel the app is faster during normal use, but can become frustrated if they experience a sudden delay.

        */
		case 'exponential': {
			const expDelay = -Math.log(1 - Math.random()) * delay
			await sleep(expDelay)
			break
		}
		default:
			await sleep(delay)
	}
}

/*
    Simulates normal (Gaussian) distribution to generate number that follows the gussian path.
*/
export const boxMullerTransform = (): number => {
	let u = 0,
		v = 0
	while (u === 0) u = Math.random()
	while (v === 0) v = Math.random()
	return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v)
}

export const handleError = (error: unknown, requestId: string, res: Response): void => {
	console.error({ error, requestId })

	if (error instanceof Error) {
		res.status(400).json({
			error: error.message,
			requestId,
			timestamp: new Date().toISOString()
		})
	} else {
		res.status(500).json({
			error: 'Internal Server Error',
			requestId,
			timestamp: new Date().toISOString()
		})
	}
}

export const validateMetadata = (metadata: MockApiMetadata): void => {
	const { limit, delay, errorRate, errorCode, authEnabled } = metadata

	if ((typeof limit !== 'number' || limit <= 0)) {
		throw new Error('Limit must be a positive number.')
	}
	if (delay !== undefined && (typeof delay !== 'number' || delay < 0)) {
		throw new Error('Delay must be a non-negative number.')
	}
	if (
		errorRate !== undefined &&
		(typeof errorRate !== 'number' || errorRate < 0 || errorRate > 100)
	) {
		throw new Error('Error rate must be between 0 and 100.')
	}
	if (errorCode && !/^[2-5]\d{2}$/.test(errorCode)) {
		throw new Error('Error code must be a valid HTTP status code.')
	}
	if (authEnabled !== undefined && typeof authEnabled !== 'boolean') {
		throw new Error('Auth enabled must be a boolean value.')
	}
}
