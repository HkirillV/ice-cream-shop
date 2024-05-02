import {itemAPI, getCachedItems, saveItemsToCache, isActive} from "./functions.js"

const creamShopListElement = document.querySelector('.table-list')
const formElement = document.querySelector('.form')
const buttonEditElement = document.querySelector('.edit-form__button-edit')
const editFormElement = document.querySelector('.edit-form')

const cachedItems = getCachedItems()
let items = cachedItems.length > 0 ? cachedItems : await itemAPI.getItem()

const renderItems = () => {

  creamShopListElement.innerHTML = items.reduce((acc, el) => {
    const {id, category_id, name, manufacturer, price} = el

    const item = `
    <tr class="table-list__item" data-id="${id}">
      <th class="table-list__id">${id}</th>
      <td class="table-list__name">${name}</td>
      <td class="table-list__manufacturer">${manufacturer}</td>
      <td class="table-list__category"></td>
      <td class="table-list__price">${price}</td>
      <td>
        <button class="button__delete btn btn-danger">Удалить</button>
      </td>
      <td>
        <button class="button__edit btn btn-primary">Редакт</button>
     </td>
      </tr>
      `
    return acc + item
  }, '')
}

saveItemsToCache(items)
renderItems()

const removeItemsFromDom = (id) => {
  const itemsElement = document.querySelector(`.table-list__item[data-id="${id}"]`)

  itemsElement?.remove()
}

const deleteItems = (id) => {
  itemAPI.deleteItem(id)
    .then(() => {
      items = items.filter((item) => item.id !== id)
      removeItemsFromDom(id)
      saveItemsToCache(items)
    })
    .catch(err => {
      console.log(err)
    })
}

const editItemsElement = (id) => {
  const itemsElement = document.querySelector(`.table-list__item[data-id="${id}"]`)
  const name = itemsElement.querySelector('.table-list__name').textContent
  const manufacturer = itemsElement.querySelector('.table-list__manufacturer').textContent
  const category = itemsElement.querySelector('.table-list__category').textContent
  const price = itemsElement.querySelector('.table-list__price').textContent
  isActive(id, category, name, manufacturer, price)
}

const onItemsListClick = (event) => {
  const itemDeleteElement = event.target.closest('.button__delete')
  const itemEditElement = event.target.closest('.button__edit')

  if (itemDeleteElement) {
    const itemElement = itemDeleteElement.closest('.table-list__item')
    const {id} = itemElement.dataset

    return deleteItems(id)
  }
  if (itemEditElement) {
    const itemElement = itemEditElement.closest('.table-list__item')
    const {id} = itemElement.dataset

    editItemsElement(id)
  }
}

creamShopListElement.addEventListener('click', onItemsListClick)

const onItemsAddFormSubmit = (event) => {
  event.preventDefault()
  const formDataElement = new FormData(event.target)
  const {name, manufacturer, price} = Object.fromEntries(formDataElement)
  const id = items.length + 1
  const newItemsElement = {id, name, manufacturer, price}

  itemAPI.addItem(newItemsElement)
    .then(() => {
      items.push(newItemsElement)
      saveItemsToCache(newItemsElement)
      renderItems()
    })
    .catch(err => {
      console.log(err)
    })

}

const onItemsEditFormSubmit = (event) => {
  event.preventDefault()
  const formDataElement = new FormData(editFormElement)
  const {id, name, manufacturer, price} = Object.fromEntries(formDataElement)
  itemAPI.editItems(id, name, manufacturer, price)
    .then(() => {
      const editedItemIndex = items.findIndex(item => item.id === String(id))
      if (editedItemIndex !== -1) {
        items[editedItemIndex] = {id, name, manufacturer, price}
        saveItemsToCache(items)
        renderItems()
        console.log(items)
      }
    })
    .catch(err => {
      console.log(err)
    })

  editFormElement.classList.remove('is-active')
}


formElement.addEventListener('submit', onItemsAddFormSubmit)
buttonEditElement.addEventListener('click', onItemsEditFormSubmit)





