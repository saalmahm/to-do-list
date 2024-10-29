const addTaskBtn = document.getElementById("task");
const addForm = document.getElementById("task-form");
addTaskBtn.addEventListener("click", () => {
    addForm.classList.toggle("hidden"); 
});

