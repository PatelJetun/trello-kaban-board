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

// Open category modal
function openCategoryModal() {
  categoryModal.style.display = "flex";
}

// Close category modal
function closeCategoryModal(e) {
  if (e.target === categoryModal || e.target === closeCategoryForm) {
    categoryModal.style.display = "none";
  }
}

// Handle submission of category form
function handleCategoryForm(e) {
  e.preventDefault();
  const categoryInput = document.querySelector("#category");

  const categoryValue = categoryInput.value.trim();
  if (!categoryValue) {
    alert("Please Enter Category Before Submitting form");
    return;
  }

  const exists = localData.some(
    (value) => value.category.toLowerCase() === categoryValue.toLowerCase()
  );
  if (exists) {
    alert("Category already exists");
    return;
  }

  const newCategory = {
    category: categoryValue,
    tasks: [],
  };

  localData.push(newCategory);
  categoryInput.value = "";
  categoryModal.style.display = "none";
  addCategoryCol(categoryValue);
  updateLocalStorage();
}

// Load data from localStorage and render
function loadLocalData() {
  if (localStorage.getItem("data")) {
    localData = JSON.parse(localStorage.getItem("data"));
    localData.forEach((value) => {
      addCategoryCol(value.category);
      value.tasks.forEach((task) => {
        renderTaskCard(task, value.category);
      });
    });
  }
}

// Add category column
function addCategoryCol(title) {
  emptyBoard.style.display = "none";
  kabanBoard.style.justifyContent = "flex-start";

  const categoryCol = document.createElement("div");
  categoryCol.classList.add("category-col");

  const categoryTitle = document.createElement("div");
  categoryTitle.classList.add("category-title");
  categoryTitle.innerHTML = `
    <p class="poppins-medium">${title}</p>
    <i class="fa-solid fa-ellipsis fa-xl" style="color: #cdccca;"></i>
  `;

  const addTask = document.createElement("div");
  addTask.classList.add("add-task-card", "poppins-regular");
  addTask.innerHTML = `<p>+ Add new Card</p>`;
  addTask.addEventListener("click", openTaskCardModal);

  categoryCol.appendChild(categoryTitle);
  categoryCol.appendChild(addTask);
  categoryCol.style.display = "flex";

  kabanBoard.appendChild(categoryCol);
  updateLocalStorage();
}

// Open task card modal and set current category
function openTaskCardModal(e) {
  const catCol = e.target.closest(".category-col");
  taskCardCategory = catCol.querySelector(".category-title p").innerText;
  taskCardModal.style.display = "flex";
}

// Close task card modal
function closeTaskCardModal() {
  taskCardCategory = null;
  taskCardModal.style.display = "none";
}

// Handle submission of task card form
function handleTaskCardForm(e) {
  e.preventDefault();
  const titleInput = document.querySelector("#taskTitle");
  const descriptionInput = document.querySelector("#taskDescription");
  const typeInput = document.querySelector("#taskType");

  const title = titleInput.value.trim();
  const description = descriptionInput.value.trim();
  const type = typeInput.value.trim();

  if (!title || !description || !type) {
    alert("Please fill all the fields.");
    return;
  }

  const category = localData.find(
    (value) => value.category === taskCardCategory
  );

  if (!category) {
    alert("Category not found.");
    return;
  }

  const newTask = {
    id: Date.now(),
    title,
    description,
    type,
  };

  category.tasks.push(newTask);
  renderTaskCard(newTask, category.category);
  updateLocalStorage();

  // Reset form fields
  titleInput.value = "";
  descriptionInput.value = "";
  typeInput.value = "";

  closeTaskCardModal();
}

// Render a single task card inside the appropriate column
function renderTaskCard(task, categoryName) {
  const categoryCols = document.querySelectorAll(".category-col");

  categoryCols.forEach((col) => {
    const catTitle = col.querySelector(".category-title p").innerText;
    if (catTitle === categoryName) {
      const addTaskBtn = col.querySelector(".add-task-card");

      const taskCard = document.createElement("div");
      taskCard.classList.add("task-card");
      taskCard.dataset.id = task.id;

      taskCard.innerHTML = `
        <div class="task-type">
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
            <i class="task-edit fa-solid fa-pen" style="color: #cdccca;"
                onmouseout="this.style.color='#cdccca'" onmouseover="this.style.color='black'"></i>
        </div>
      `;

      // Insert before the "+ Add new Card" so that button is always last
      col.insertBefore(taskCard, addTaskBtn);
    }
  });
}

// Save localData to localStorage
function updateLocalStorage() {
  localStorage.setItem("data", JSON.stringify(localData));
}
