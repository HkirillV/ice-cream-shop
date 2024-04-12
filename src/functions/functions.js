const BASE_URL = 'http://localhost:3000/item'

const parseResponse = (response)  => response.json()

export const itemAPI = {
  getItem: async () => {
    return fetch(BASE_URL).then(parseResponse)
  },
  addItem: async (id, title, count, date) => {
    return fetch(`${BASE_URL}/${id,  title, count, date}`, {
      body: JSON.stringify({id}),
      method: 'POST'
    }).then(parseResponse)
  },
  deleteItem: async (id) => {
    return fetch(`${BASE_URL}/${id}`, {
      method: "DELETE"
    }).then(parseResponse)
  }
}