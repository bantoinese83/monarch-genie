// Input validation and sanitization utilities

export function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocols
    .replace(/on\w+\s*=/gi, '') // Remove event handlers
}

export function validatePrompt(prompt: string): { isValid: boolean; error?: string } {
  if (!prompt || prompt.trim().length === 0) {
    return { isValid: false, error: 'Please enter an application idea.' }
  }

  if (prompt.length < 10) {
    return { isValid: false, error: 'Please provide a more detailed description (at least 10 characters).' }
  }

  if (prompt.length > 2000) {
    return { isValid: false, error: 'Description is too long. Please keep it under 2000 characters.' }
  }

  // Check for potentially harmful content
  const harmfulPatterns = [
    /<script/i,
    /javascript:/i,
    /on\w+\s*=/i,
    /<iframe/i,
    /<object/i,
    /<embed/i,
  ]

  for (const pattern of harmfulPatterns) {
    if (pattern.test(prompt)) {
      return { isValid: false, error: 'Invalid content detected. Please remove any scripts or HTML tags.' }
    }
  }

  return { isValid: true }
}

export function validateProjectTitle(title: string): { isValid: boolean; error?: string } {
  if (!title || title.trim().length === 0) {
    return { isValid: false, error: 'Project name is required.' }
  }

  if (title.length < 3) {
    return { isValid: false, error: 'Project name must be at least 3 characters long.' }
  }

  if (title.length > 100) {
    return { isValid: false, error: 'Project name is too long. Please keep it under 100 characters.' }
  }

  // Check for invalid characters
  const invalidChars = /[<>:"/\\|?*]/
  if (invalidChars.test(title)) {
    return { isValid: false, error: 'Project name contains invalid characters.' }
  }

  return { isValid: true }
}

export function sanitizeProjectTitle(title: string): string {
  return title
    .trim()
    .replace(/[<>:"/\\|?*]/g, '') // Remove invalid characters
    .substring(0, 100) // Limit length
}
