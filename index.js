const addCategory = document.querySelector("#add-category");
const categoryModal = document.querySelector("#createCategoryModal");
const closeCategoryForm = document.querySelector("#close-category-form");
const categorySubmitBtn = document.querySelector("#category-form .submit-btn");
const kabanBoard = document.querySelector("#kaban-board");
const emptyBoard = document.querySelector("#empty-board");
const taskCardModal = document.querySelector("#createTaskCardModal");
const closeTaskCardBtn = document.querySelector("#close-task-form");
const taskCardSubmitBtn = document.querySelector("#taskCardFormSubmitBtn");
let taskCardCategory = null;
let localData = [];

window.onload = loadLocalData;

addCategory.addEventListener("click", openCategoryModal);
categoryModal.addEventListener("click", closeCategoryModal);
closeCategoryForm.addEventListener("click", closeCategoryModal);
categorySubmitBtn.addEventListener("click", handleCategoryForm);
closeTaskCardBtn.addEventListener("click", closeTaskCardModal);
taskCardSubmitBtn.addEventListener("click", handleTaskCardForm);

function openCategoryModal() {
  categoryModal.style.display = "flex";
}

function closeCategoryModal(e) {
  if (e.target === categoryModal || e.target === closeCategoryForm) {
    categoryModal.style.display = "none";
  }
}

function handleCategoryForm(e) {
  e.preventDefault();

  const categoryInput = document.querySelector("#category");
  if (!categoryInput.value) {
    alert("Please Enter Category Before Submitting form");
  } else {
    //checking if category already exists or not
    const exists = localData.some(
      (value) => value.category === categoryInput.value
    );
    if (exists) {
      alert("Category already exists");
      return;
    } else {
      //  creating new category
      const newCategory = {
        category: categoryInput.value,
        tasks: [],
      };
      localData.push(newCategory);
      categoryModal.style.display = "none";
      addCategoryCol(categoryInput.value);
      categoryInput.value = null;
      console.log(localData);
    }
  }
}

function loadLocalData() {
  if (localStorage.getItem("data")) {
    localData = JSON.parse(localStorage.getItem("data"));
    localData.forEach((value) => {
      addCategoryCol(value.category);
    });
  }
}

function addCategoryCol(title) {
  //display style changes in kaban board and removing empty board div
  emptyBoard.style.display = "none";
  kabanBoard.style.justifyContent = "flex-start";

  //create new cateogry column
  const categoryCol = document.createElement("div");
  categoryCol.classList.add("category-col");

  //create title div for category
  const categoryTitle = document.createElement("div");
  categoryTitle.classList.add("category-title");

  //create add task card div
  const addTask = document.createElement("div");
  addTask.classList.add("add-task-card", "poppins-regular");
  addTask.innerHTML = `<p>+ Add new Card</p>`;
  addTask.addEventListener("click", openTaskCardModal);

  //appending category title to the column
  categoryCol.appendChild(categoryTitle);
  categoryTitle.innerHTML = `<p class="poppins-medium">${title}</p>
        <i class="fa-solid fa-ellipsis fa-xl" style="color: #cdccca;"></i>`;

  //appending add task card to the category column
  categoryCol.appendChild(addTask);
  categoryCol.style.display = "flex";

  // appending category column to the board
  kabanBoard.appendChild(categoryCol);

  //storing newly added category in local storage
  let str = JSON.stringify(localData);
  localStorage.setItem("data", str);
}

//Opens Task Card Form
function openTaskCardModal(e) {
  //Getting the category for the task card to add into
  const catCol = e.target.closest(".category-col");
  taskCardCategory = catCol.querySelector(".category-title p").innerText;
  taskCardModal.style.display = "flex";
}

//Close Task Cardf Form
function closeTaskCardModal() {
  taskCardCategory = null;
  taskCardModal.style.display = "none";
}

//Handles Submission of task Card form
function handleTaskCardForm(e) {
  e.preventDefault();
  const title = document.querySelector("#taskTitle");
  const description = document.querySelector("#taskDescription");
  const type = document.querySelector("#taskType");
  
  if (!title.value || !description.value || !type.value) {
    alert("Please make sure to fill all the fields");
    return;
  } 

  const category = localData.find(value => value.category === taskCardCategory);
  if(!category){
    alert('Category not found')
    return;
  }

  const newTask = {
    id : Date.now(),
    title: title.value,
    description: description.value,
    type: type.value
  }

  category.tasks.push(newTask)
  addTaskCard(category)
  // localStorage.setItem("data", JSON.stringify(localData));
  title.value = null;
  description.value = null;
  type.value = null;
  closeTaskCardModal()
}

//Adds New Task Card and stores it data in local Storage
function addTaskCard(data) {
  //getting all present category-col
  const categoryCol = document.querySelectorAll(".category-col");
  console.log(data);
  categoryCol.forEach(value => {
    const catName = value.querySelector(".category-title p").innerText
    if(catName === data.category){
      data.tasks.forEach(task => {
        console.log(task);
        //create task card
        const taskCard = document.createElement('div');
        taskCard.classList.add('task-card');
        taskCard.innerHTML = `<div class="task-type">
                    <span class="task-type-span poppins-medium">${task.type}</span>
                </div>
                <div class="task-content">
                    <p class="task-content-main poppins-regular">${task.title}</p>
                    <p class="task-content-description poppins-light">${task.description}</p>
                </div>
                <div class="task-settings">
                    <span class="like-count poppins-light">0</span>
                    <i class="task-like fa-regular fa-heart" style="color: #cdccca;"
                        onmouseout="this.style.color='#cdccca'" onmouseover="this.style.color='black'"></i>
                    <i class="task-edit fa-solid fa-pen" style="color: #cdccca;" onmouseout="this.style.color='#cdccca'"
                        onmouseover="this.style.color='black'"></i>
                </div>`;
                value.appendChild(taskCard)
      })
      
    }

  })
}
