// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));
const taskNameInputEl=$("#title");
const taskDateInputEl= $("#taskDueDate");
const taskContentInputEl=$("#taskDescription");
const taskFormEl = $('#formModal');
const taskContainer=$('#task-container');

function saveTasksToStorage(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }


function readTasksFromStorage() {
    
    let tasks = JSON.parse(localStorage.getItem('tasks'));
  
    // ? If no projects were retrieved from localStorage, assign projects to a new empty array to push to later.
    if (!tasks) {
      tasks = [];
    }
    // ? Return the projects array either empty or with data in it whichever it was determined to be by the logic right above.
    return tasks;
  }
  

// Todo: create a function to generate a unique task id
function generateTaskId() {


}

// Todo: create a function to create a task card
function createTaskCard(task) {
const taskCard = $('<div>')
    .addClass('card project-card draggable my-3')
    .attr('data-project-id',task.id);
const taskHeader = $('<div>').addClass('card-header h4').text(task.name);
const taskBody = $('<div>').addClass('card-body');
const cardDescription = $('<p>').addClass('card-text').text(task.description);
const taskDueDate = $('<p>').addClass('card-text').text(task.dueDate);
const taskDeleteBtn = $('<button>')
      .addClass('btn btn-danger delete')
      .text('Delete')
      .attr('data-project-id', task.id);
// taskDeleteBtn.on('click', handleDeleteProject); 

if (task.dueDate && task.status !== 'done') {
    const now = dayjs();
    const taskDueDate = dayjs(task.dueDate, 'DD/MM/YYYY');

    // ? If the task is due today, make the card yellow. If it is overdue, make it red.
    if (now.isSame(taskDueDate, 'day')) {
      taskCard.addClass('bg-warning text-white');
    } else if (now.isAfter(taskDueDate)) {
      taskCard.addClass('bg-danger text-white');
      taskDeleteBtn.addClass('border-light');
    }
  }

taskBody.append(cardDescription, taskDueDate, taskDeleteBtn);
taskCard.append(taskHeader, taskBody);
taskContainer.append(taskCard);


return taskCard;
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    const tasks=readTasksFromStorage();
    for (const task of tasks) {
        const taskCard = createTaskCard(task);
      }
}

// Todo: create a function to handle adding a new task
function handleAddTask(event){
event.preventDefault();

const taskName=taskNameInputEl.val();
const taskDesp=taskContentInputEl.val();
const taskDueDate=taskDateInputEl.val();

const newTask = {
    name:taskName,
    description:taskDesp,
    dueDate:taskDueDate,
    status:'to-do'
}

const tasks = readTasksFromStorage();
  tasks.push(newTask);

  // ? Save the updated projects array to localStorage
  saveTasksToStorage(tasks);

  // ? Clear the form inputs
  taskNameInputEl.val('');
  taskDateInputEl.val('');
  taskContentInputEl.val('');
  $('#formModal').modal('hide');
  renderTaskList();

};

taskFormEl.on('submit', handleAddTask);

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

// printProjectData();
document.querySelector('button').addEventListener("click", handleAddTask);

$('#taskDueDate').datepicker({
    changeMonth: true,
    changeYear: true
}
);

  // ? Make lanes droppable
  $('.lane').droppable({
    accept: '.draggable',
    drop: handleDrop,
  });

});
