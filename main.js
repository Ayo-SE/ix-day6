class Task {
    constructor(task, completed, dateCompleted) {
      this.id = UUID.generate();
      this.name = task;
      this.completed = completed;
      this.dateCompleted = dateCompleted;
    }
  }
  
  
  class StorageService {
    constructor() {
      this.tasks = [];
      this.populateTasks();
    }
  
    populateTasks() {
      let tasks = [];
      let tasksAsString = localStorage.getItem('tasks');
      if (tasksAsString) {
        const taskObjects = JSON.parse(tasksAsString);
        tasks = taskObjects.map(t => new Task(t.name, t.completed, t.dateCompleted));
      }
  
      this.tasks = tasks;
    }
  
    addTask(task) {
      this.tasks.push(task);
  
      const tasksAsString = JSON.stringify(this.tasks);
      localStorage.setItem('tasks', tasksAsString);
    }
  
    updateTask(task) {
      // TODO:
    }
  
    removeTask(uuid) {
      // TODO:
    }
  }
  
  class UserInterface {
    constructor() {
      this.storage = new StorageService();
      this.table = document.getElementById('table-body');
      this.taskInput = document.getElementById('task-input');
    }
  
    initialize() {
      this.initializeFormSubmitListener();
      this.populateTasksTable();
    }
  
    initializeFormSubmitListener() {
      const taskForm = document.getElementById('task-form');
      taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
  
        this.createTaskFromInput();
        this.clearFormInputs();
        this.populateTasksTable();
      });
    }
  
    createTaskFromInput() {
      const taskName = this.taskInput.value;
  
      const task = new Task(taskName, false, null);
  
      this.storage.addTask(task);
    }
  
    populateTasksTable() {
      this.clearTable();
  
      for (const task of this.storage.tasks) {
        this.addTaskToTable(task);
      }
    }
  
    clearTable() {
      let length = this.table.children.length;
      for (let i = 0; i < length; i++) {
        const row = this.table.children[0];
        row.remove();
      }
    }
  
    addTaskToTable(task) {
      const row = document.createElement('tr');
  
      row.innerHTML = `
        <td>${task.name}</td>
        <td class="text-center">${this.getCompleteIconHtml(task.completed)}</td>
        <td>${this.formatDate(task.dateCompleted)}</td>
        <td class="text-center">
            <div class="d-grid gap-2">
            <button class="id=${task.id} btn btn-outline-secondary">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                </svg>
            </button>
            </div>
        </td>
      `;
  
      // TODO: add id attribute to row
  
      this.table.append(row);
      this.addCompleteTaskListenerToRow(row);
      this.addDeleteListenerToRow(row);
    }
  
    getCompleteIconHtml(completed) {
        return `
        <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
        </div>
        `;
    }
  
    formatDate(date) {
        //if(row.children[1].children[0].getElementById('flexCheckDefault').checked = true) {
            let d = new Date();
            let year = d.getFullYear();
            let month = d.getMonth() + 1;
            let day = 0;
            if (d.getDate() < 10) {
                day = '0' + d.getDate();
            } else {
                day = d.getDate();
            }

        return month + '/' + day + '/' + year;
        // } else {
        //     return 'Incomplete';
        // }

        
    }
  
    addCompleteTaskListenerToRow(row) {
      // TODO
    }
  
    addDeleteListenerToRow(row) {
      row.children[3].children[0].addEventListener('click', (e) => {
          row.remove();
        //   for (let i = 0; i < tasks.length; i++) {
        //       if (tasks[i].id = row.children[3].children[0].id) {
        //           tasks.split(i, i);
        //       }
        //   }
      });
    }
  
    clearFormInputs() {
      // TODO
    }
  }
  
  
  document.addEventListener('DOMContentLoaded', () => {
    const ui = new UserInterface();
    ui.initialize();
  });