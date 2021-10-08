import * as React from 'react'
import {ReactQueryConfigProvider} from 'react-query'
import {BrowserRouter} from 'react-router-dom'
import {AuthProvider} from './auth-context.exercise'

const queryConfig = {
  retry(failureCount, error) {
    if (error.status === 404) return false
    else if (failureCount < 2) return true
    else return false
  },
  useErrorBoundary: true,
  refetchAllOnWindowFocus: false,
}

function AppProviders({children}) {
  return (
    <AuthProvider>
      <ReactQueryConfigProvider config={queryConfig}>
        <BrowserRouter>{children}</BrowserRouter>
      </ReactQueryConfigProvider>
    </AuthProvider>
  )
}

export {AppProviders}
