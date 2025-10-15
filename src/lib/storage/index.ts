// Minimal IndexedDB wrapper with localStorage fallback
import { STORAGE_KEYS } from '../../config/constants'

const DB_NAME = 'buebu-db'
const STORE_NAME = 'projects'

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (!('indexedDB' in window)) {
      reject(new Error('IndexedDB not supported'))
      return
    }
    const request = indexedDB.open(DB_NAME, 1)
    request.onupgradeneeded = () => {
      const db = request.result
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME)
      }
    }
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}

async function idbGet<T>(key: string): Promise<T | undefined> {
  const db = await openDb()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readonly')
    const store = tx.objectStore(STORE_NAME)
    const req = store.get(key)
    req.onsuccess = () => resolve(req.result as T | undefined)
    req.onerror = () => reject(req.error)
  })
}

async function idbSet<T>(key: string, value: T): Promise<void> {
  const db = await openDb()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite')
    const store = tx.objectStore(STORE_NAME)
    const req = store.put(value as unknown as IDBValidKey, key)
    req.onsuccess = () => resolve()
    req.onerror = () => reject(req.error)
  })
}

async function idbDel(key: string): Promise<void> {
  const db = await openDb()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite')
    const store = tx.objectStore(STORE_NAME)
    const req = store.delete(key)
    req.onsuccess = () => resolve()
    req.onerror = () => reject(req.error)
  })
}

export async function loadAllProjects<T>(): Promise<T[]> {
  try {
    const data = await idbGet<T[]>('all')
    if (Array.isArray(data)) return data
  } catch {}
  const raw = localStorage.getItem(STORAGE_KEYS.projects)
  return raw ? (JSON.parse(raw) as T[]) : []
}

export async function saveProjects<T>(projects: T[]): Promise<void> {
  try {
    await idbSet('all', projects)
  } catch {
    if (projects.length > 0) {
      localStorage.setItem(STORAGE_KEYS.projects, JSON.stringify(projects))
    } else {
      localStorage.removeItem(STORAGE_KEYS.projects)
    }
  }
}

// Removed unused deleteAllProjects function
