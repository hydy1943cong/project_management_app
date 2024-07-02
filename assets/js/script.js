
// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));
const taskNameInputEl=$("#title");
const taskDateInputEl= $("#taskDueDate");
const taskContentInputEl=$("#taskDescription");
const taskFormEl = $('#formModal');
const taskContainer=$('#task-container').addClass('draggable');
const todoList=$('#todo-cards');
const inProgressList=$('#in-progress-cards');
const doneList=$('#done-cards');


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
    if (!nextId) {
        nextId =1;
    } else {
      nextId++;
    }
    localStorage.setItem("nextId",JSON.stringify(nextId));
    return nextId;
}

// Todo: create a function to create a task card
function createTaskCard(task) {
  let taskCard = $('<div>')
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
  taskDeleteBtn.on('click', handleDeleteTask); 

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
  
 taskCard.draggable({
      opacity: 0.7,
      zIndex: 100,
      // ? This is the function that creates the clone of the card that is dragged. This is purely visual and does not affect the data.
      helper: function (e) {
        // ? Check if the target of the drag event is the card itself or a child element. If it is the card itself, clone it, otherwise find the parent card  that is draggable and clone that.
        const original = $(e.target).hasClass('ui-draggable')
          ? $(e.target)
          : $(e.target).closest('.ui-draggable');
        // ? Return the clone with the width set to the width of the original card. This is so the clone does not take up the entire width of the lane. This is to also fix a visual bug where the card shrinks as it's dragged to the right.
        return original.clone().css({
          width: original.outerWidth(),
        });
      },
    });

    if (task.status === 'to-do') {
      $('#todo-cards').append(taskCard);
    } else if (task.status === 'in-progress') {
      $('#in-progress-cards').append(taskCard);
    } else if (task.status === 'done') {
      $('#done-cards').append(taskCard);
    }

return taskCard;
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    const tasks = readTasksFromStorage();
    todoList.empty();
    inProgressList.empty();
    doneList.empty();

    tasks.forEach(task => {
      const taskCard = createTaskCard(task);
      if (task.status === 'to-do') {
          todoList.append(taskCard);
      } else if (task.status === 'in-progress') {
          inProgressList.append(taskCard);
      } else if (task.status === 'done') {
          doneList.append(taskCard);
      }
  });

}


function printTaskData() {
    const tasks = readTasksFromStorage();
  
    // ? Empty existing project cards out of the lanes
    
    todoList.empty();
    inProgressList.empty();
    doneList.empty();
  
    // ? Loop through projects and create project cards for each status
    for (let task of tasks) {
      if (task.status === 'to-do') {
        todoList.append(createTaskCard(task));
      } else if (task.status === 'in-progress') {
        inProgressList.append(createTaskCard(task));
      } else if (task.status === 'done') {
        doneList.append(createTaskCard(task));
      }
    }
    renderTaskList();
}



// Todo: create a function to handle adding a new task
function handleAddTask(event){
event.preventDefault();

const taskName=taskNameInputEl.val();
const taskDesp=taskContentInputEl.val();
const taskDueDate=taskDateInputEl.val();

const newTask = {
    id:generateTaskId(),
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
function handleDeleteTask() {
    const taskId = parseInt($(this).attr('data-project-id'));
    let tasks = readTasksFromStorage();
  
    tasks = tasks.filter(task => task.id !== taskId);
  
    // ? We will use our helper function to save the projects to localStorage
    saveTasksToStorage(tasks);
  
    // ? Here we use our other function to print projects back to the screen
    renderTaskList();
  }
  
// Todo: create a function to handle dropping a task into a new status lane

function handleDrop(event, ui) {
    // ? Read projects from localStorage
    const tasks = readTasksFromStorage();
    const newStatus = event.target.id.replace('-cards', '');
    // ? Get the project id from the event
    const taskId = ui.draggable.attr("data-project-id");
    tasks.forEach(task => {
      if (task.id === parseInt(taskId)) {
          task.status = newStatus;
      }
  });
  
    // ? Save the updated projects array to localStorage (overwritting the previous one) and render the new project data to the screen.
    saveTasksToStorage(tasks);
    renderTaskList();
  }



// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

renderTaskList();
// document.querySelector('button').addEventListener("click", handleAddTask);

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
