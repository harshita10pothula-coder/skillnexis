let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
    const list = document.getElementById('taskList');
    list.innerHTML = '';
    tasks.forEach((task, i) => {
        const li = document.createElement('li');
        li.className = 'task';
        li.innerHTML = `
            <span class="${task.done ? 'completed' : ''}" onclick="toggleTask(${i})">${task.text}</span>
            <div class="task-actions">
                <button onclick="toggleTask(${i})">${task.done ? '↩' : '✓'}</button>
                <button class="delete-btn" onclick="deleteTask(${i})">✕</button>
            </div>
        `;
        list.appendChild(li);
    });
}

function addTask() {
    const input = document.getElementById('taskInput');
    const text = input.value.trim();
    if (!text) return;
    tasks.push({ text, done: false });
    saveTasks();
    renderTasks();
    input.value = '';
}

function toggleTask(i) {
    tasks[i].done = !tasks[i].done;
    saveTasks();
    renderTasks();
}

function deleteTask(i) {
    tasks.splice(i, 1);
    saveTasks();
    renderTasks();
}

renderTasks();
