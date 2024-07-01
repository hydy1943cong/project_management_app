// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));
const taskNameInputEl=document.querySelector("#title");
const taskDescriptionInputEl=document.querySelector("#taskDescription");
const taskDueDateInputEl=document.querySelector("#taskDueDate");


// Todo: create a function to generate a unique task id
function generateTaskId() {


}

// Todo: create a function to create a task card
function createTaskCard(task) {
const taskCard = $('<div>')
    .addClass('card project-card draggable my-3')
    .attr('data-project-id',project.id);
const taskHeader = $('<div>').addClass('card-header h4').text(project.name);
const taskBody = $('<div>').addClass('card-body');
const cardDescription = $('<p>').addClass('card-text').text(project.type);
const taskDueDate = $('<p>').addClass('card-text').text(project.dueDate);
const taskDeleteBtn = $('<button>')
      .addClass('btn btn-danger delete')
      .text('Delete')
      .attr('data-project-id', project.id);
taskDeleteBtn.on('click', handleDeleteProject); 

if (project.dueDate && project.status !== 'done') {
    const now = dayjs();
    const taskDueDate = dayjs(project.dueDate, 'DD/MM/YYYY');

    // ? If the task is due today, make the card yellow. If it is overdue, make it red.
    if (now.isSame(taskDueDate, 'day')) {
      taskCard.addClass('bg-warning text-white');
    } else if (now.isAfter(taskDueDate)) {
      taskCard.addClass('bg-danger text-white');
      taskDeleteBtn.addClass('border-light');
    }
  }

taskBody.append(taskDescription, taskDueDate, taskDeleteBtn);
  taskCard.append(taskHeader, taskBody);

return taskCard;
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {

}

// Todo: create a function to handle adding a new task
function handleAddTask(event){

    $('#popup').click(function(){
        if (!$(this).hasClass('open')){
          $('.form').css('display','block')
          $(this).addClass('open');
          $(this).text('CLOSE FORM');
        }
        else{
          $('.form').css('display','none')
          $(this).removeClass('open');
          $(this).text('OPEN FORM');
        }
      });


event.preventDefault();
alert(querySelector("#popup"));
const taskName=taskNameInputEl.val();
const taskDesp=taskDescriptionInputEl.val();
const taskDueDate=taskDueDateInputEl.val();

const newTask = {
    name:taskName,
    description:taskDesp,
    dueDate:taskDueDate,
    status:'to-do',
};

}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

printProjectData();
document.querySelector('button').addEventListener("click", handleAddTask);
  
$('#taskDueDate').datepicker({
    changeMonth: true,
    changeYear: true,
  });

  // ? Make lanes droppable
  $('.lane').droppable({
    accept: '.draggable',
    drop: handleDrop,
  });

});
