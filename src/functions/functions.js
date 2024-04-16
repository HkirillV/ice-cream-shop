const BASE_URL = 'http://localhost:3000/item'

const parseResponse = (response) => response.json()

export const itemAPI = {
  getItem: async () => {
    return fetch(BASE_URL).then(parseResponse)
  },
  addItem: async (id, title, count, date) => {
    return fetch(`${BASE_URL}`, {
      method: 'POST',
      body: JSON.stringify({id, title, count, date}),
    }).then(parseResponse)
  },
  deleteItem: async (id) => {
    return fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
    }).then(parseResponse)
  }
}


export const getCachedItems = () => {
  const items = localStorage.getItem('items')

  return items ? JSON.parse(items) : []
}

export const saveItemsToCache = (id) => {
  localStorage.setItem('items', JSON.stringify(id))
}