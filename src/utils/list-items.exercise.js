import {useQuery, useMutation, queryCache} from 'react-query'
import {client} from './api-client'

function useListItem(user, bookId) {
  const result = useListItems(user)
  return {
    ...result,
    listItem:
      result.listItems.find(listItem => listItem.bookId === bookId) ?? null,
  }
}

function useListItems(user) {
  const result = useQuery({
    queryKey: 'list-items',
    queryFn: () =>
      client(`list-items`, {token: user.token}).then(data => data.listItems),
  })
  return {...result, listItems: result.data ?? []}
}

const defaultMutationOptions = {
  onSettled: () => queryCache.invalidateQueries('list-items'),
}

function useUpdateListItem(user) {
  return useMutation(
    data =>
      client(`list-items/${data.id}`, {data, method: 'PUT', token: user.token}),
    defaultMutationOptions,
  )
}

function useRemoveListItem(user) {
  return useMutation(
    ({id}) => client(`list-items/${id}`, {token: user.token, method: 'DELETE'}),
    defaultMutationOptions,
  )
}

function useCreateListItem(user) {
  return useMutation(
    ({bookId}) => client('list-items', {data: {bookId}, token: user.token}),
    defaultMutationOptions,
  )
}

export {
  useListItem,
  useListItems,
  useUpdateListItem,
  useRemoveListItem,
  useCreateListItem,
}
