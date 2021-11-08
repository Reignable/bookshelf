import {server, rest} from 'test/server'
import {client} from '../api-client'

const apiURL = process.env.REACT_APP_API_URL
const endpoint = 'test-endpoint'

beforeAll(() => server.listen())
afterAll(() => server.close())
afterEach(() => server.resetHandlers())

test('calls fetch at the endpoint with the arguments for GET requests', async () => {
  const mockResult = {mockValue: 'VALUE'}
  server.use(
    rest.get(`${apiURL}/${endpoint}`, async (req, res, ctx) => {
      return res(ctx.json(mockResult))
    }),
  )
  const result = await client(endpoint)
  expect(result).toEqual(mockResult)
})

test('adds auth token when a token is provided', async () => {
  const token = 'fake-user-token'
  let request
  server.use(
    rest.get(`${apiURL}/${endpoint}`, async (req, res, ctx) => {
      request = req
      return res(ctx.json('good'))
    }),
  )
  await client(endpoint, {token})
  expect(request.headers.get('Authorization')).toContain(token)
})

test('allows for config overrides', async () => {
  const config = {
    mode: 'cors',
    headers: {'Content-Type': 'fake-type'},
  }

  let request
  server.use(
    rest.get(`${apiURL}/${endpoint}`, async (req, res, ctx) => {
      request = req
      return res(ctx.json('good'))
    }),
  )
  await client(endpoint, config)
  expect(request.headers.get('Content-Type')).toBe(
    config.headers['Content-Type'],
  )
})

test('when data is provided, it is stringified and the method defaults to POST', async () => {
  server.use(
    rest.post(`${apiURL}/${endpoint}`, async (req, res, ctx) => {
      return res(ctx.json({key: 'value'}))
    }),
  )
  const data = {key: 'value'}
  const result = await client(endpoint, {data})
  expect(result).toEqual(data)
})

test('responses are rejected with data if not ok', async () => {
  const errorResponse = {message: 'this is the response!'}
  server.use(
    rest.get(`${apiURL}/${endpoint}`, async (req, res, ctx) => {
      return res(ctx.status(400), ctx.json(errorResponse))
    }),
  )
  await expect(client(endpoint)).rejects.toEqual(errorResponse)
})
