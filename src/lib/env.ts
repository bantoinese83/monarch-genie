type Env = {
  VITE_GEMINI_API_KEY?: string
}

// Removed unused getEnv function - using requireEnvKey directly

export function requireEnvKey(key: keyof Env): string {
  const value = (import.meta as any).env[key]
  if (!value || value.trim() === '') {
    throw new Error(`Missing required env: ${key}`)
  }
  return value
}
