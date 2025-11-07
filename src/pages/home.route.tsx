import { Link } from '@tanstack/react-router'
import { providers } from '../features/providers'
import { Card, CardContent } from '../components/ui/Card'
import { Button } from '../components/ui/Button'

export default function Home() {
  return (
    <div>
      <div className="mb-5">
        <h2 className="text-xl font-semibold">Providers</h2>
        <p className="text-sm text-gray-600">Pick a provider to view guide and configure.</p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {providers.map((p) => (
          <Card key={p.id} className="group motion-safe:transition-all motion-safe:duration-150 hover:shadow-md hover:-translate-y-0.5">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white shadow-sm">
                  <img src={p.logo} alt="" className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <div className="mb-1 font-medium transition-colors group-hover:text-gray-900">{p.name}</div>
                  <div className="text-xs text-gray-600">{p.summary}</div>
                </div>
              </div>
              <div className="mt-4">
                <Link to="/$providerId/guide" params={{ providerId: p.id }}>
                  <Button size="sm">Open</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
