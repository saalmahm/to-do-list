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

    // element de filtrage 
    const filterPriority = document.getElementById("filter-priority");

    // Sélection du bouton de tri par date
const sortDateBtn = document.getElementById("sort-date");

    //pour la fonctionalite de modification
    let isEditing = false; 
    let currentTask = null; 

    addTaskBtn.addEventListener("click", () => {
        modal.classList.remove("hidden"); 
        addForm.classList.remove("hidden"); 
        isEditing = false; 
        addForm.reset(); 
    });

    cancelBtn.addEventListener("click", () => {
        addForm.classList.add("hidden"); 
        modal.classList.add("hidden"); 
    });

    function updateTaskCounts() {
        toDoCount.textContent = `(${toDoList.childElementCount})`;
        inProgressCount.textContent = `(${inProgressList.childElementCount})`;
        doneCount.textContent = `(${doneList.childElementCount})`;
    }

    filterPriority.addEventListener("change", () => {
        const selectedPriority = filterPriority.value;
    
        [toDoList, inProgressList, doneList].forEach(list => {
            Array.from(list.children).forEach(task => {
                const taskPriority = task.classList.contains("bg-red-600") ? "P1 (red)" :
                    task.classList.contains("bg-orange-600") ? "P2 (orange)" :
                    task.classList.contains("bg-green-600") ? "P3 (green)" : "";
    
                if (selectedPriority === "" || taskPriority === selectedPriority) {
                    task.style.display = "block";
                } else {
                    task.style.display = "none";
                }
            });
        });
    });
    
    sortDateBtn.addEventListener("click", () => {
        [toDoList, inProgressList, doneList].forEach(list => {
            const tasksArray = Array.from(list.children);
    
            tasksArray.sort((a, b) => {
                const dateA = new Date(a.querySelector("span").textContent);
                const dateB = new Date(b.querySelector("span").textContent);
                return dateA - dateB; 
            });
    
            tasksArray.forEach(task => list.appendChild(task));
        });
    });

    addForm.addEventListener("submit", (event) => {
        event.preventDefault(); 

        const title = document.getElementById("task-title").value;
        const date = document.getElementById("task-date").value;
        const priority = document.getElementById("task-priority").value;
        const category = document.getElementById("task-category").value;

        if (isEditing && currentTask) {
            currentTask.querySelector("strong").textContent = title; 
            currentTask.querySelector("span").textContent = date; 
            currentTask.classList.remove("bg-red-600", "bg-orange-600", "bg-green-600"); 

            if (priority.includes("P1 (red)")) {
                currentTask.classList.add("bg-red-600"); 
            } else if (priority.includes("P2 (orange)")) {
                currentTask.classList.add("bg-orange-600"); 
            } else if (priority.includes("P3 (green)")) {
                currentTask.classList.add("bg-green-600");
            }

            const currentCategory = currentTask.getAttribute("data-category");
            if (currentCategory !== category) {
                if (currentCategory === "to-do-list") {
                    toDoList.removeChild(currentTask);
                } else if (currentCategory === "in-progress-list") {
                    inProgressList.removeChild(currentTask);
                } else if (currentCategory === "done-list") {
                    doneList.removeChild(currentTask);
                }

                if (category === "to-do-list") {
                    toDoList.appendChild(currentTask);
                } else if (category === "in-progress-list") {
                    inProgressList.appendChild(currentTask);
                } else if (category === "done-list") {
                    doneList.appendChild(currentTask);
                }
                currentTask.setAttribute("data-category", category);
            }

            addForm.reset(); 
            modal.classList.add("hidden"); 
            addForm.classList.add("hidden"); 
            currentTask = null;
            isEditing = false; 
        } else {
            const taskElement = document.createElement("div");
            
            taskElement.classList.add("p-4", "rounded", "border", "text-white");
            taskElement.setAttribute("data-category", category); 

            if (priority.includes("P1 (red)")) {
                taskElement.classList.add("bg-red-600");
            } else if (priority.includes("P2 (orange)")) {
                taskElement.classList.add("bg-orange-600");
            } else if (priority.includes("P3 (green)")) {
                taskElement.classList.add("bg-green-600");
            }

            taskElement.innerHTML = `<strong>${title}</strong><br><span>${date}</span>
            <div class="flex justify-end gap-10">
                <button class="bg-blue-600 border-white rounded px-4 py-2 text-white modify-btn">Modifier</button>
                <button class="bg-red-500 border-white rounded px-4 py-2 text-white delete-btn">Supprimer</button>
            </div>`;

            if (category === "to-do-list") {
                toDoList.appendChild(taskElement);
            } else if (category === "in-progress-list") {
                inProgressList.appendChild(taskElement);
            } else if (category === "done-list") {
                doneList.appendChild(taskElement);
            }
            updateTaskCounts(); 

            taskElement.querySelector(".delete-btn").addEventListener("click", () => {
                taskElement.remove(); 
                updateTaskCounts(); 
            });

            taskElement.querySelector(".modify-btn").addEventListener("click", () => {
                modal.classList.remove("hidden"); 
                addForm.classList.remove("hidden"); 

                document.getElementById("task-title").value = title; 
                document.getElementById("task-date").value = date; 
                document.getElementById("task-priority").value = priority; 
                document.getElementById("task-category").value = category; 
                isEditing = true; 
                currentTask = taskElement; 
            });
        }

        updateTaskCounts();
        addForm.reset(); 
        modal.classList.add("hidden"); 
        addForm.classList.add("hidden");
    });

