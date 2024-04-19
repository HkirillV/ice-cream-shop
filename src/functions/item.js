import {itemAPI, getCachedItems, saveItemsToCache, isActive} from "./functions.js"

const creamShopListElement = document.querySelector('.cream-shop-list')
const formElement = document.querySelector('.form')
const editFormElement = document.querySelector('.edit-form')
const buttonEditElement = document.querySelector('.button-edit')

const cachedItems = getCachedItems()
let items = cachedItems.length > 0 ? cachedItems : await itemAPI.getItem()

const renderItems = () => {

  creamShopListElement.innerHTML = items.reduce((acc, el) => {
    const {id, title, count, date} = el
    const item = `
      <div class="cream-shop-list__item" data-id="${id}">
        <div class="cream-shop-list__name">
          <p class="fw-bold">${id}</p>
          <div class="cream-shop-list__title fw-medium">${title}</div>
        </div>
        <div class="cream-shop-list__name">
          <span class="fw-medium">${count} шт</span>
          <span class="fw-medium">${date}</span>
        </div>
        <div class="button">
          <button class="button__delete btn btn-danger">Удалить</button>
          <button class="button__edit btn btn-primary">Редакт</button>
        </div>
      </div>
      `

    return acc + item
  }, '')
}

saveItemsToCache(items)
renderItems()

const removeItemsFromDom = (id) => {
  const itemsElement = document.querySelector(`.cream-shop-list__item[data-id="${id}"]`)

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

const onItemsListClick = (event) => {
  const itemDeleteElement = event.target.closest('.button__delete')

  const itemElement = itemDeleteElement.closest('.cream-shop-list__item')
  const {id} = itemElement.dataset

  deleteItems(id)
}

creamShopListElement.addEventListener('click', onItemsListClick)

const onItemsAddFormSubmit = (event) => {
  event.preventDefault()
  const formDataElement = new FormData(event.target)
  const {title, count, date} = Object.fromEntries(formDataElement)
  const id =  items.length += 1
  const newItemsElement = {id, title, count, date}

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

formElement.addEventListener('submit', onItemsAddFormSubmit)
// buttonEditElement.addEventListener('click', isActive)










