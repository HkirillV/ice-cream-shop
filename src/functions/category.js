import {categoryAPI, getCachedCategory, saveCategoryToCached} from "./functions.js";

const formCategoryListElement = document.querySelector('.form-category__list')
const formCategoryInputElement = document.querySelector('.form-category__input')
const formCategoryBtnAddElement = document.querySelector('.form-category__btn-add')
const formCategoryAddElement = document.querySelector('.form-category__add')
const btnDeleteCategoryElement = document.querySelector('.btn-delete__category')
const btnEditCategoryElement = document.querySelector('.btn-edit__category')
const editFormCategoryElement = document.querySelector('.edit-category')
const editCategoryBtnElement = document.querySelector('.edit-category-btn')

const cachedCategory = getCachedCategory()
let categories = cachedCategory.length > 0 ? cachedCategory : await categoryAPI.getCategory()

const renderCategory = () => {
  formCategoryListElement.innerHTML = categories.reduce((acc, el) => {
    const {id, name} = el
    const category = `
     <option value="${id}">${name}</option>
    `
    return acc + category
  }, '')
}

const renderCategoryAdd = () => {
  formCategoryAddElement.innerHTML = categories.reduce((acc, el) => {
    const {id, name} = el
    const category = `
     <option value="${id}">${name}</option>
    `
    return acc + category
  }, '')
}

saveCategoryToCached(categories)
renderCategoryAdd()
renderCategory()


const onCategoryAddFormSubmit = (event) => {
  event.preventDefault()
  const idFalseAndTrue = categories.every(category => category.id !== String(categories.length + 1))
  const id = idFalseAndTrue === true ? categories.length + 1 : categories.length + 2
  const name = formCategoryInputElement.value
  const newCategory = {id, name}

  categoryAPI.addCategory(newCategory)
    .then((response) => {
      categories.push(newCategory)
      saveCategoryToCached(newCategory)
      renderCategoryAdd()
      renderCategory()
    })
    .catch((err) => {
      console.log(err)
    })
}

const deleteCategory = (event) => {
  event.preventDefault()
  const id = formCategoryListElement.value

  categoryAPI.deleteCategory(id)
    .then((response) => {
      categories = categories.filter(category => category.id !== id)
      saveCategoryToCached(categories)
      renderCategoryAdd()
      renderCategory()
    })
    .catch((err) => {
      console.log(err)
    })
}

const isActive = (event) => {
  event.preventDefault()
  editFormCategoryElement.classList.toggle('is-active')
}

const editCategoryElement = (event) => {
  event.preventDefault()
  const id = Number(formCategoryListElement.value)
  const name = document.querySelector('.edit-category-input').value

  categoryAPI.editCategory(id, name)
    .then(() => {
      const editCategoryElement = categories.findIndex(category => category.id === String(id))
      if (editCategoryElement !== -1) {
        categories[editCategoryElement] = {id, name}
        saveCategoryToCached(categories)
        renderCategoryAdd()
        renderCategory()
      }
    })
    .catch((err) => {
      console.log(err)
    })

  editFormCategoryElement.classList.remove('is-active')
}

editCategoryBtnElement.addEventListener('click', editCategoryElement)
btnDeleteCategoryElement.addEventListener('click', deleteCategory)
btnEditCategoryElement.addEventListener('click', isActive)
formCategoryBtnAddElement.addEventListener('click', onCategoryAddFormSubmit)