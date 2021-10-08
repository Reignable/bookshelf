import {FullPageErrorFallback, FullPageSpinner} from 'components/lib'
import React from 'react'
import {client} from 'utils/api-client'
import {useAsync} from 'utils/hooks'
import * as auth from 'auth-provider'

export const AuthContext = React.createContext()

function useAuth() {
  const context = React.useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

async function getUser() {
  let user = null

  const token = await auth.getToken()
  if (token) {
    const data = await client('me', {token})
    user = data.user
  }

  return user
}

function AuthProvider(props) {
  const {
    data: user,
    error,
    isLoading,
    isIdle,
    isError,
    isSuccess,
    run,
    setData,
  } = useAsync()

  React.useEffect(() => {
    run(getUser())
  }, [run])

  const login = form => auth.login(form).then(user => setData(user))
  const register = form => auth.register(form).then(user => setData(user))
  const logout = () => {
    auth.logout()
    setData(null)
  }

  if (isLoading || isIdle) {
    return <FullPageSpinner />
  }

  if (isError) {
    return <FullPageErrorFallback error={error} />
  }

  if (isSuccess) {
    return (
      <AuthContext.Provider
        value={{user, login, register, logout}}
        {...props}
      />
    )
  }
}

function useClient() {
  const {user} = useAuth()
  const {token} = user
  const authenticatedClient = React.useCallback(
    (endpoint, config) => client(endpoint, {...config, token}),
    [token],
  )
  return authenticatedClient
}

export {useAuth, AuthProvider, useClient}
