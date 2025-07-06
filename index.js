const addCategory = document.querySelector('#add-category')
const categoryModal = document.querySelector("#createCategoryModal");
const closeCategoryForm = document.querySelector('#close-category-form')
const categorySubmitBtn = document.querySelector("#category-form .submit-btn");
const kabanBoard = document.querySelector('#kaban-board')
const emptyBoard = document.querySelector('#empty-board')
let category = []

window.onload = loadLocalData()

addCategory.addEventListener('click', openCategoryModal)
categoryModal.addEventListener('click', closeCategoryModal)
closeCategoryForm.addEventListener('click', closeCategoryModal)
categorySubmitBtn.addEventListener('click', handleCategoryForm)

function openCategoryModal(){
    categoryModal.style.display = 'flex';
}

function closeCategoryModal(e){
    if(e.target === categoryModal || e.target === closeCategoryForm ){
        categoryModal.style.display = 'none';
    }
}

function handleCategoryForm(e){
    e.preventDefault()
    
    const categoryInput = document.querySelector('#category')   
    if(!categoryInput.value){
        alert('Please Enter Category Before Submitting form')
    }else{
        if(category.find((element) => categoryInput.value) === categoryInput.value){
            alert('Category already exists')
        } else{
            category.push(categoryInput.value)
            categoryModal.style.display = 'none';
            addCategoryCol(categoryInput.value)
            categoryInput.value = null;
            console.log(category);
            
        }
    }
}

function loadLocalData() {
  if (localStorage.getItem("category")) {
    category = JSON.parse(localStorage.getItem("category"));
    category.forEach(value => {
        addCategoryCol(value)
    })
  }
};

function addCategoryCol(title){
    emptyBoard.style.display = 'none'
    const categoryCol = document.createElement('div')
    categoryCol.classList.add('category-col')
    const categoryTitle = document.createElement('div')
    categoryTitle.classList.add('category-title')
    categoryCol.appendChild(categoryTitle)
    categoryTitle.innerHTML = 
        `<p class="poppins-medium">${title}</p>
        <i class="fa-solid fa-ellipsis fa-xl" style="color: #cdccca;"></i>`;
    categoryCol.style.display = 'flex'
    kabanBoard.appendChild(categoryCol)
    let str = JSON.stringify(category)
    console.log(str);
    localStorage.setItem('category', str)
}