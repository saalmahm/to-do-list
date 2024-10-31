const addTaskBtn = document.getElementById("task");
const addForm = document.getElementById("task-form");
const cancelBtn = document.getElementById("cancel");
const toDoList = document.getElementById("to-do-list");
const modal = document.getElementById("modal");
const inProgressList = document.getElementById("in-progress-list");
const doneList = document.getElementById("done-list");
// Les éléments pour les compteurs
const toDoCount = document.getElementById("to-do-count");
const inProgressCount = document.getElementById("in-progress-count");
const doneCount = document.getElementById("done-count");

addTaskBtn.addEventListener("click", () => {
    modal.classList.remove("hidden"); // Affiche le modal
    addForm.classList.remove("hidden"); // Affiche le formulaire
});

cancelBtn.addEventListener("click", () => {
    addForm.classList.add("hidden"); // Cache le formulaire
    modal.classList.add("hidden"); // Cache le modal
});

function updateTaskCounts() {
    toDoCount.textContent = `(${toDoList.childElementCount})`;
    inProgressCount.textContent = `(${inProgressList.childElementCount})`;
    doneCount.textContent = `(${doneList.childElementCount})`;
}

addForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Empêche la soumission par défaut

    const title = document.getElementById("task-title").value;
    const date = document.getElementById("task-date").value;
    const priority = document.getElementById("task-priority").value;
    const category = document.getElementById("task-category").value;

    // Crée un nouvel élément de tâche
    const taskElement = document.createElement("div");
    taskElement.classList.add("p-4", "rounded", "border", "text-white");

    if (priority.includes("P1 (en rouge)")) {
        taskElement.classList.add("bg-red-600");
    } else if (priority.includes("P2 (en orange)")) {
        taskElement.classList.add("bg-orange-600");
    } else if (priority.includes("P3 (en vert)")) {
        taskElement.classList.add("bg-green-600");
    }
    taskElement.innerHTML = `<strong>${title}</strong><br><span>${date}</span>`;

    // Ajoute la tâche dans la catégorie sélectionnée
    if (category === "to-do-list") {
        toDoList.appendChild(taskElement);
    } else if (category === "in-progress-list") {
        inProgressList.appendChild(taskElement);
    } else if (category === "done-list") {
        doneList.appendChild(taskElement);
    }
    updateTaskCounts();

    addForm.reset();
    addForm.classList.add("hidden"); // Cache le formulaire après l'ajout
    modal.classList.add("hidden"); // Cache le modal après l'ajout
});
