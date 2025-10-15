// Analytics and monitoring utilities

export interface AnalyticsEvent {
  name: string
  properties?: Record<string, any>
  timestamp?: number
}

class Analytics {
  private events: AnalyticsEvent[] = []
  private isEnabled = process.env.NODE_ENV === 'production'

  track(eventName: string, properties?: Record<string, any>) {
    if (!this.isEnabled) return

    const event: AnalyticsEvent = {
      name: eventName,
      properties,
      timestamp: Date.now(),
    }

    this.events.push(event)
    console.log('Analytics Event:', event)
  }

  trackError(error: Error, context?: string) {
    this.track('error', {
      message: error.message,
      stack: error.stack,
      context,
    })
  }

  trackPerformance(operation: string, duration: number) {
    this.track('performance', {
      operation,
      duration,
    })
  }

  trackUserAction(action: string, details?: Record<string, any>) {
    this.track('user_action', {
      action,
      ...details,
    })
  }

  getEvents() {
    return [...this.events]
  }

  clearEvents() {
    this.events = []
  }
}

export const analytics = new Analytics()

// Performance monitoring
function measurePerformance<T>(
  operation: string,
  fn: () => T | Promise<T>
): T | Promise<T> {
  const start = performance.now()
  
  const result = fn()
  
  if (result instanceof Promise) {
    return result.then((res) => {
      const duration = performance.now() - start
      analytics.trackPerformance(operation, duration)
      return res
    })
  } else {
    const duration = performance.now() - start
    analytics.trackPerformance(operation, duration)
    return result
  }
}

// Error boundary integration
function trackErrorBoundary(error: Error, errorInfo: any) {
  analytics.trackError(error, 'error_boundary')
  analytics.track('error_boundary', {
    componentStack: errorInfo.componentStack,
  })
}
