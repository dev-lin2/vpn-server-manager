import { createRootRoute, createRoute, createRouter, RouterProvider } from '@tanstack/react-router'
import Root from '../pages/root.layout'
import Home from '../pages/home.route'
import ProviderLayout from '../pages/provider.layout'
import ProviderGuide from '../pages/provider.guide'
import ProviderConfigPage from '../pages/provider.config'
import ProviderInstances from '../pages/provider.instances'

const rootRoute = createRootRoute({
  component: Root,
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
})

const providerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/$providerId',
  component: ProviderLayout,
})

const guideRoute = createRoute({
  getParentRoute: () => providerRoute,
  path: 'guide',
  component: ProviderGuide,
})

const configRoute = createRoute({
  getParentRoute: () => providerRoute,
  path: 'config',
  component: ProviderConfigPage,
})

const instancesRoute = createRoute({
  getParentRoute: () => providerRoute,
  path: 'instances',
  component: ProviderInstances,
})

const routeTree = rootRoute.addChildren([
  indexRoute,
  providerRoute.addChildren([guideRoute, configRoute, instancesRoute]),
])

const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

export function AppRouter() {
  return <RouterProvider router={router} />
}
