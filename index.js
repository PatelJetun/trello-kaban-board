const addCategory = document.querySelector('#add-category')
const categoryModal = document.querySelector("#createCategoryModal");
const closeCategoryForm = document.querySelector('#close-category-form')
const categorySubmitBtn = document.querySelector("#category-form .submit-btn");


addCategory.addEventListener('click', openCategoryModal)
categoryModal.addEventListener('click', closeCategoryModal)
closeCategoryForm.addEventListener('click', closeCategoryModal)
categorySubmitBtn.addEventListener('click', handleCategoryForm)

function openCategoryModal(){
    categoryModal.style.display = 'flex';
}

function closeCategoryModal(e){
    if(e.target === categoryModal || e.target === closeCategoryForm){
        categoryModal.style.display = 'none';
    }
}

function handleCategoryForm(e){
    e.preventDefault()
}
