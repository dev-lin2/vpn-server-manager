import outline from './outline.json'

export type FieldType = 'text' | 'password' | 'number' | 'select' | 'textarea'

export type ProviderField = {
  key: string
  label: string
  type: FieldType
  required?: boolean
  options?: { label: string; value: string }[]
}

export type ProviderSchema = {
  providerId: string
  guide: { title: string; markdown: string }
  config: { fields: ProviderField[] }
}

export const providerSchemas: Record<string, ProviderSchema> = {
  outline: outline as ProviderSchema,
}

