// Performance monitoring and optimization utilities

export interface PerformanceMetric {
  name: string
  value: number
  timestamp: number
  type: 'timing' | 'memory' | 'custom'
}

export interface PerformanceThreshold {
  name: string
  threshold: number
  severity: 'warning' | 'error'
}

class PerformanceMonitor {
  private metrics: PerformanceMetric[] = []
  private thresholds: PerformanceThreshold[] = [
    { name: 'first-contentful-paint', threshold: 1500, severity: 'warning' },
    { name: 'largest-contentful-paint', threshold: 2500, severity: 'error' },
    { name: 'cumulative-layout-shift', threshold: 0.1, severity: 'warning' },
    { name: 'first-input-delay', threshold: 100, severity: 'warning' },
  ]

  recordMetric(name: string, value: number, type: 'timing' | 'memory' | 'custom' = 'custom') {
    const metric: PerformanceMetric = {
      name,
      value,
      timestamp: Date.now(),
      type,
    }
    
    this.metrics.push(metric)
    
    // Check thresholds
    const threshold = this.thresholds.find(t => t.name === name)
    if (threshold && value > threshold.threshold) {
      console.warn(`Performance threshold exceeded: ${name} = ${value}ms (threshold: ${threshold.threshold}ms)`)
    }
  }

  measureTiming<T>(name: string, fn: () => T | Promise<T>): T | Promise<T> {
    const start = performance.now()
    const result = fn()
    
    if (result instanceof Promise) {
      return result.then((res) => {
        const duration = performance.now() - start
        this.recordMetric(name, duration, 'timing')
        return res
      })
    } else {
      const duration = performance.now() - start
      this.recordMetric(name, duration, 'timing')
      return result
    }
  }

  measureMemory() {
    if ('memory' in performance) {
      const memory = (performance as any).memory
      this.recordMetric('used-js-heap-size', memory.usedJSHeapSize, 'memory')
      this.recordMetric('total-js-heap-size', memory.totalJSHeapSize, 'memory')
      this.recordMetric('js-heap-size-limit', memory.jsHeapSizeLimit, 'memory')
    }
  }

  getMetrics() {
    return [...this.metrics]
  }

  getMetricsByName(name: string) {
    return this.metrics.filter(m => m.name === name)
  }

  getAverageMetric(name: string) {
    const metrics = this.getMetricsByName(name)
    if (metrics.length === 0) return 0
    
    const sum = metrics.reduce((acc, m) => acc + m.value, 0)
    return sum / metrics.length
  }

  clearMetrics() {
    this.metrics = []
  }

  setThreshold(name: string, threshold: number, severity: 'warning' | 'error') {
    const existing = this.thresholds.find(t => t.name === name)
    if (existing) {
      existing.threshold = threshold
      existing.severity = severity
    } else {
      this.thresholds.push({ name, threshold, severity })
    }
  }
}

const performanceMonitor = new PerformanceMonitor()

// Web Vitals monitoring
export function measureWebVitals() {
  // First Contentful Paint
  if ('PerformanceObserver' in window) {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.name === 'first-contentful-paint') {
          performanceMonitor.recordMetric('first-contentful-paint', entry.startTime, 'timing')
        }
      }
    })
    
    observer.observe({ entryTypes: ['paint'] })
  }

  // Largest Contentful Paint
  if ('PerformanceObserver' in window) {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      const lastEntry = entries[entries.length - 1]
      performanceMonitor.recordMetric('largest-contentful-paint', lastEntry.startTime, 'timing')
    })
    
    observer.observe({ entryTypes: ['largest-contentful-paint'] })
  }

  // Cumulative Layout Shift
  if ('PerformanceObserver' in window) {
    let clsValue = 0
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!(entry as any).hadRecentInput) {
          clsValue += (entry as any).value
        }
      }
      performanceMonitor.recordMetric('cumulative-layout-shift', clsValue, 'timing')
    })
    
    observer.observe({ entryTypes: ['layout-shift'] })
  }
}

// Memory monitoring
export function startMemoryMonitoring(intervalMs: number = 30000) {
  setInterval(() => {
    performanceMonitor.measureMemory()
  }, intervalMs)
}

// Bundle size monitoring
function measureBundleSize() {
  if ('performance' in window && 'getEntriesByType' in performance) {
    const resources = performance.getEntriesByType('resource')
    const jsResources = resources.filter(r => r.name.includes('.js'))
    const totalSize = jsResources.reduce((acc, r) => acc + (r as any).transferSize || 0, 0)
    
    performanceMonitor.recordMetric('bundle-size', totalSize, 'custom')
  }
}

// Component render performance
function measureComponentRender<T>(
  componentName: string,
  renderFn: () => T
): T {
  return performanceMonitor.measureTiming(`component-render-${componentName}`, renderFn) as T
}

// API call performance
function measureApiCall<T>(
  endpoint: string,
  apiCall: () => Promise<T>
): Promise<T> {
  return performanceMonitor.measureTiming(`api-call-${endpoint}`, apiCall) as Promise<T>
}
