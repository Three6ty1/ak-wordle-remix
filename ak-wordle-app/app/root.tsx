import {
  Outlet,
  Meta,
  Links,
  ScrollRestoration,
  Scripts,
  LiveReload,
  useRouteError,
  useLocation,
  isRouteErrorResponse,
} from '@remix-run/react'

import { ErrorBoundaryComponent, LinksFunction, MetaFunction } from '@remix-run/react/dist/routeModules'
import * as React from 'react'

import globalStylesUrl from '~/styles/global.css'

export let links: LinksFunction = () => {
  return [
    { rel: 'stylesheet', href: globalStylesUrl },
    { rel: 'manifest', href: '/manifest.json' },
  ]
}

// CHANGE HERE
// And in /public/manifest.json too
export let meta: MetaFunction = () => {
  return [
    { title: "Arknights Wordle" },
    {
      property: "og:title",
      content: "Arknights Wordle",
    },
    {
      name: "description",
      content: "Arknights Wordle project by Three6ty1",
    },
  ];
}

export default function App() {
  return (
    <Document>
      <Layout>
        <Outlet />
      </Layout>
    </Document>
  )
}

function Document({
  children,
  title,
}: {
  children: React.ReactNode
  title?: string
}) {
  return (
    <html lang="en">
      <head>
        <meta
          charSet="utf-8"
          name="viewport"
          content="width=device-width,initial-scale=1,initial-scale=1, maximum-scale=1, user-scalable=0"
        />
        {title ? <title>{title}</title> : null}
        <Meta />
        <Links />
      </head>
      <body className='no-scrollbar'>
        {children}
        <RouteChangeAnnouncement />
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === 'development' && <LiveReload />}
      </body>
    </html>
  )
}

function Layout({ children }: React.PropsWithChildren<{}>) {
  return <div className="remix-app">{children}</div>
}

export function CatchBoundary() {
  const caught = useRouteError()

  let message
  if (isRouteErrorResponse(caught)) {
    switch (caught.status) {
      case 401:
        message = (
          <p>
            Oops! Looks like you tried to visit a page that you do not have access
            to.
          </p>
        )
        break
      case 404:
        message = (
          <p>Oops! Looks like you tried to visit a page that does not exist.</p>
        )
        break
  
      default:
        throw new Error(caught.data || caught.statusText)
    }

    return (
      <Document title={`${caught.status} ${caught.statusText}`}>
        <Layout>
          <h1>
            {caught.status}: {caught.statusText}
          </h1>
          {message}
        </Layout>
      </Document>
    )
  }
  return (
    <Document title='Unknown Error has occured'>
      <Layout>
        Unknown error has occured
      </Layout>
    </Document>
  )
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error)
  return (
    <Document title="Error!">
      <Layout>
        <div>
          <h1>There was an error</h1>
          <p>{error.message}</p>
          <hr />
          <p>
            Hey, developer, you should replace this with what you want your
            users to see.
          </p>
        </div>
      </Layout>
    </Document>
  )
}

/**
 * Provides an alert for screen reader users when the route changes.
 */
const RouteChangeAnnouncement = React.memo(() => {
  let [hydrated, setHydrated] = React.useState(false)
  let [innerHtml, setInnerHtml] = React.useState('')
  let location = useLocation()

  React.useEffect(() => {
    setHydrated(true)
  }, [])

  let firstRenderRef = React.useRef(true)
  React.useEffect(() => {
    // Skip the first render because we don't want an announcement on the
    // initial page load.
    if (firstRenderRef.current) {
      firstRenderRef.current = false
      return
    }

    let pageTitle = location.pathname === '/' ? 'Home page' : document.title
    setInnerHtml(`Navigated to ${pageTitle}`)
  }, [location.pathname])

  // Render nothing on the server. The live region provides no value unless
  // scripts are loaded and the browser takes over normal routing.
  if (!hydrated) {
    return null
  }

  return (
    <div
      aria-live="assertive"
      aria-atomic
      id="route-change-region"
      style={{
        border: '0',
        clipPath: 'inset(100%)',
        clip: 'rect(0 0 0 0)',
        height: '1px',
        margin: '-1px',
        overflow: 'hidden',
        padding: '0',
        position: 'absolute',
        width: '1px',
        whiteSpace: 'nowrap',
        wordWrap: 'normal',
      }}
    >
      {innerHtml}
    </div>
  )
})
