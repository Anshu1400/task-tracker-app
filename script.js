document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task');
    const addTaskButton = document.getElementById('add-task');
    const taskList = document.getElementById('task-list');

    // Load tasks from localStorage
    const loadTasks = () => {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            createTaskElement(task, index);
        });
    };

    // Save tasks to localStorage
    const saveTasks = (tasks) => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    // Create a task list item
    const createTaskElement = (task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${task}</span>
            <div>
                <button class="edit" onclick="editTask(${index})">Edit</button>
                <button class="delete" onclick="deleteTask(${index})">Delete</button>
            </div>
        `;
        taskList.appendChild(li);
    };

    // Add a new task
    addTaskButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText === '') {
            alert('Task cannot be empty!');
            return;
        }

        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push(taskText);
        saveTasks(tasks);
        createTaskElement(taskText, tasks.length - 1);
        taskInput.value = '';
    });

    // Edit a task
    window.editTask = (index) => {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const newTaskText = prompt('Edit task:', tasks[index]);
        if (newTaskText !== null && newTaskText.trim() !== '') {
            tasks[index] = newTaskText;
            saveTasks(tasks);
            loadTasks();
        }
    };

    // Delete a task
    window.deleteTask = (index) => {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.splice(index, 1);
        saveTasks(tasks);
        loadTasks();
    };

    // Initial load
    loadTasks();
});
