const read = <T>(key: string, fallback: T): T => {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return fallback
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

const write = <T>(key: string, value: T) => {
  localStorage.setItem(key, JSON.stringify(value))
}

export const storage = { read, write }

export const STORAGE_KEYS = {
  configs: 'vpn:configs',
  instances: 'vpn:instances',
} as const

export type ProviderConfig = Record<string, unknown>
export type ConfigMap = Record<string, ProviderConfig>

export type Instance = {
  id: string
  name: string
  createdAt: string
  data?: Record<string, unknown>
}
export type InstanceMap = Record<string, Instance[]>

