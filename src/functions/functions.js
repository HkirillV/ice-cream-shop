
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
  editItems: async (id, category_id, name, manufacturer, price) => {
    return fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        id: id,
        category_id: category_id,
        name: name,
        manufacturer: manufacturer,
        price: price
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

  const editFormIdElement = editFormElement.querySelector('.edit-form__id')
  const editFormNameElement = editFormElement.querySelector('.edit-form__name')
  const editFormManufacturerElement = editFormElement.querySelector('.edit-form__manufacturer ')
  const editFormCategoryElement = editFormElement.querySelector('.edit-form__category')
  const editFormPriceElement = editFormElement.querySelector('.edit-form__price')

  const newValueFormIdElement = editFormIdElement.value = id
  const newValueFormNameElement = editFormNameElement.value = name
  const newValueFormManufacturerElement = editFormManufacturerElement.value = manufacturer
  const newValueFormCategoryElement = editFormCategoryElement.value = category
  const newValueFormPriceElement = editFormPriceElement.value = price
  editFormElement.classList.toggle('is-active')
}


const URL_CATEGORY = 'http://localhost:3000/ice_cream_categories'

const parseResponseCat = (response) => response.json()

export const categoryAPI = {
  getCategory: async () => {
    return fetch(URL_CATEGORY).then(parseResponseCat)
  },
  addCategory: async (newCategory) => {
    return fetch(`${URL_CATEGORY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newCategory),
    }).then(parseResponseCat)
  },
  deleteCategory: async (id) => {
    return fetch(`${URL_CATEGORY}/${id}`, {
      method: 'DELETE',
    }).then(parseResponse)
  },
  editCategory: async (id, category_id, name, manufacturer, price) => {
    return fetch(`${URL_CATEGORY}/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        id: id,
        category_id: category_id,
        name: name,
        manufacturer: manufacturer,
        price: price
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(parseResponseCat)
  }
}

export const getCachedCategory = () => {
  const category = localStorage.getItem('category')

  return category ? JSON.parse(category) : []
}

export const saveCategoryToCached = (id) => {
  localStorage.setItem('category', JSON.stringify(id))
}
