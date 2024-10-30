const addTaskBtn = document.getElementById("task");
const addForm = document.getElementById("task-form");
const cancelBtn = document.getElementById("cancel");
const toDoList = document.getElementById("to-do-list");
const modal = document.getElementById("modal");

addTaskBtn.addEventListener("click", () => {
    modal.classList.remove("hidden"); // Affiche le modal
    addForm.classList.remove("hidden"); // Affiche le formulaire
});

cancelBtn.addEventListener("click", () => {
    addForm.classList.add("hidden"); // Cache le formulaire
    modal.classList.add("hidden"); // Cache le modal
});

addForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Empêche la soumission par défaut

    const title = document.getElementById("task-title").value;
    const date = document.getElementById("task-date").value;
    const priority = document.getElementById("task-priority").value;

    // Crée un nouvel élément de tâche
    const taskElement = document.createElement("div");
    taskElement.classList.add("p-4", "rounded", "border", "white");

    if (priority.includes("P1 (en rouge)")) {
        taskElement.classList.add("bg-red-600");
    } else if (priority.includes("P2 (en orange)")) {
        taskElement.classList.add("bg-orange-600");
    } else if (priority.includes("P3 (en vert)")) {
        taskElement.classList.add("bg-green-600");
    }

    taskElement.innerHTML = `<strong>${title}</strong><br><span>${date}</span>`;

    toDoList.appendChild(taskElement);

    addForm.reset();
    addForm.classList.add("hidden"); // Cache le formulaire après l'ajout
    modal.classList.add("hidden"); // Cache le modal après l'ajout
});
