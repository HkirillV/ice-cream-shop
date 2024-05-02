
const BASE_URL = 'http://localhost:3000/icecream'

const parseResponse = (response) => response.json()

export const itemAPI = {
  getItem: async () => {
    return fetch(BASE_URL).then(parseResponse)
  },
  addItem: async (date) => {
    return fetch(`${BASE_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(date),
    }).then(parseResponse)
  },
  deleteItem: async (id) => {
    return fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
    }).then(parseResponse)
  },
  editItems: async (id, name, count, date) => {
    return fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        id: id,
        title: name,
        count: count,
        date: date
      }),
      headers: {
        'Content-Type': 'application/json',
      },
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

export const isActive = (id, category, name, manufacturer, price) => {
  const editFormElement = document.querySelector(`.edit-form`)
  const idEdit = editFormElement.querySelector('.edit-form__id')
  const nameEdit = editFormElement.querySelector('.edit-form__name')
  const manufacturerEdit = editFormElement.querySelector('.edit-form__manufacturer ')
  const categoryEdit = editFormElement.querySelector('.edit-form__category')
  const priceEdit = editFormElement.querySelector('.edit-form__price')

  const itemId = idEdit.value = id
  const newName = nameEdit.value = name
  const newCount = manufacturerEdit.value = manufacturer
  const newCategory = categoryEdit.value = category
  const newDate = priceEdit.value = price
  editFormElement.classList.toggle('is-active')
}
