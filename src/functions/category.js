import {categoryAPI, getCachedCategory, saveCategoryToCached} from "./functions.js";

const formCategoryListElement = document.querySelector('.form-category__list')
const formCategoryInputElement = document.querySelector('.form-category__input')
const formCategoryAddElement = document.querySelector('.form-category__add')

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

saveCategoryToCached(categories)
renderCategory()

const onCategoryAddFormSubmit = (event) => {
  event.preventDefault()
  const idFalseAndTrue = categories.some((category) => category.id === categories.length + 1)
  const id = idFalseAndTrue === true ? categories.length + 2 : categories.length + 1
  const name = formCategoryInputElement.value
  const newCategory = {id, name}

  categoryAPI.addCategory(newCategory)
    .then((response) => {
      categories.push(newCategory)
      saveCategoryToCached(newCategory)
      renderCategory()
    })
    .catch((err) => {
      console.log(err)
    })

}

formCategoryAddElement.addEventListener('click', onCategoryAddFormSubmit)