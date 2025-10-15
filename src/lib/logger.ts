// Removed unused logInfo and logWarn functions - only keeping logError

export function logError(message: string, ...args: unknown[]) {
  console.error(`[buebu] ${message}`, ...args)
}
