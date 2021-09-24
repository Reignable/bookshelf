function client(endpoint, customConfig = {}) {
  const config = {
    method: 'GET',
    ...customConfig,
  }
  const fullUrl = `${process.env.REACT_APP_API_URL}/${endpoint}`
  return window.fetch(fullUrl, config).then(response => response.json())
}

export {client}
