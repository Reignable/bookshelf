function client(endpoint, customConfig = {}) {
  const config = {
    method: 'GET',
    ...customConfig,
  }
  const fullUrl = `${process.env.REACT_APP_API_URL}/${endpoint}`
  return window.fetch(fullUrl, config).then(async response => {
    const data = await response.json()
    if (response.ok) return data
    return Promise.reject(data)
  })
}

export {client}
