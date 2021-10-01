import {useQuery, useMutation, queryCache} from 'react-query'
import {client} from './api-client'
import {setQueryDataForBook} from './books.exercise'

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
    config: {
      onSuccess(listItems) {
        listItems.forEach(listItem => setQueryDataForBook(listItem.book))
      },
    },
  })
  return {...result, listItems: result.data ?? []}
}

const defaultMutationOptions = {
  onSettled: () => queryCache.invalidateQueries('list-items'),
  onError: (err, variables, recover) =>
    typeof recover === 'function' ? recover() : null,
}

function useUpdateListItem(user, mutationOptions = {}) {
  return useMutation(
    data =>
      client(`list-items/${data.id}`, {data, method: 'PUT', token: user.token}),
    {
      onMutate: newItem => {
        const previousItems = queryCache.getQueryData('list-items')
        queryCache.setQueryData('list-items', old => {
          return old.map(item => {
            return item.id === newItem.id ? {...item, ...newItem} : item
          })
        })
        return () => queryCache.setQueryData('list-items', previousItems)
      },
      ...defaultMutationOptions,
      ...mutationOptions,
    },
  )
}

function useRemoveListItem(user, mutationOptions = {}) {
  return useMutation(
    ({id}) => client(`list-items/${id}`, {token: user.token, method: 'DELETE'}),
    {
      onMutate: removedItem => {
        const previousItems = queryCache.getQueryData('list-items')
        queryCache.setQueryData('list-items', old =>
          old.filter(item => item.id !== removedItem.id),
        )
        return () => queryCache.setQueryData('list-items', previousItems)
      },
      ...defaultMutationOptions,
      ...mutationOptions,
    },
  )
}

function useCreateListItem(user, mutationOptions = {}) {
  return useMutation(
    ({bookId}) => client('list-items', {data: {bookId}, token: user.token}),
    {
      onMutate: addedItem => {
        const previousItems = queryCache.getQueryData('list-items')
        queryCache.setQueryData('list-items', old => [...old, addedItem])
        return () => queryCache.setQueryData('list-items', previousItems)
      },
      ...defaultMutationOptions,
      ...mutationOptions,
    },
  )
}

export {
  useListItem,
  useListItems,
  useUpdateListItem,
  useRemoveListItem,
  useCreateListItem,
}
