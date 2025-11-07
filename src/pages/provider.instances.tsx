import { useMemo, useState } from 'react'
import { useParams } from '@tanstack/react-router'
import { storage, STORAGE_KEYS } from '../lib/storage'
import type { InstanceMap, Instance } from '../lib/storage'
import { Card, CardContent } from '../components/ui/Card'
import { Button } from '../components/ui/Button'

function uid() {
  return Math.random().toString(36).slice(2, 10)
}

export default function ProviderInstances() {
  const { providerId } = useParams({ from: '/$providerId/instances' })
  const [_, setTick] = useState(0)

  const instances = useMemo(() => {
    const map = storage.read<InstanceMap>(STORAGE_KEYS.instances, {})
    return map[providerId] ?? []
  }, [providerId, _])

  const saveAll = (list: Instance[]) => {
    const map = storage.read<InstanceMap>(STORAGE_KEYS.instances, {})
    map[providerId] = list
    storage.write(STORAGE_KEYS.instances, map)
    setTick((x) => x + 1)
  }

  const add = () => {
    const next: Instance = { id: uid(), name: `Instance ${uid()}`, createdAt: new Date().toISOString() }
    saveAll([next, ...instances])
  }

  const remove = (id: string) => {
    saveAll(instances.filter((i) => i.id !== id))
  }

  return (
    <div className="space-y-3">
      <Button onClick={add} size="sm">New Instance</Button>
      {instances.length === 0 ? (
        <Card>
          <CardContent className="p-6 text-sm text-gray-600">No instances yet. Create one to get started.</CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {instances.map((i) => (
            <Card key={i.id}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-medium">{i.name}</div>
                    <div className="text-xs text-gray-500">{new Date(i.createdAt).toLocaleString()}</div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => remove(i.id)}>Delete</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
