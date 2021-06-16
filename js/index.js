const hmTaskManager = new TaskManager();




window.addEventListener('load', function () {
  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.getElementsByClassName('needs-validation');
  
  // assign modal toggle to the add-task-button
  const form_modal = new bootstrap.Modal(document.querySelector('#addTaskForm'));
  document.querySelector('#add-task-button').addEventListener('click', evt => {
    // toggle the modal
    form_modal.show();
  });

  // trim and re-validate input fields
  const taskName = document.querySelector('#taskName');
  taskName.addEventListener('focusout', evt => {
    taskName.value = taskName.value.trim();
    if (taskName.value.length < 5) {
      taskName.setCustomValidity('wtf man');
    }
  });


  // Loop over them and prevent submission
  var validation = Array.prototype.filter.call(forms, function (form) {
    form.addEventListener('submit', function (event) {
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
        form.classList.add('was-validated');
      } else {
        form.classList.remove('was-validated');

        const taskName = document.querySelector("#taskName");
        const assignedTo = document.querySelector("#assignedTo");
        const dueDate = document.querySelector("#dueDate");
        const taskStatus = document.querySelector("#taskStatus");
        const descriptionBox = document.querySelector("#descriptionBox");
        hmTaskManager.addTask(
          taskName.value,
          descriptionBox.value,
          assignedTo.value,
          dueDate.value,
          taskStatus.value
        );

        event.preventDefault();
        document.querySelector('form').reset();
        // console.log(hmTaskManager.tasks);
        hmTaskManager.render();
        form_modal.hide();
      }
    }, false);
  });

  // setting the minimum valid due date in the form
  const today = new Date();
  const dueDate = document.querySelector('#dueDate');

  const yyyy = today.getFullYear();
  const mm = `0${today.getMonth() + 1}`.slice(-2);
  const dd = today.getDate();

  const todaysDate = `${yyyy}-${mm}-${dd}`;
  dueDate.setAttribute('min', todaysDate);

  // generate random tasks and render them
  for (let i = 0; i < 15; i++)
    hmTaskManager.addRandomTask();

  hmTaskManager.render();

}, false);


const taskLists = document.querySelectorAll('.list-group');

// assign the click listener to cards

for (const list of taskLists) {
  list.addEventListener('click', evt => {
    const element = evt.target;
    console.log(element);
    if (element.classList.contains('card-icon-check')) {
      const card = element.parentNode.parentNode.parentNode;
      const id = Number(card.getAttribute('data-task-id'));
      const task = hmTaskManager.getTaskById(id);
      task.status = '4';
      hmTaskManager.render();
    }
  });
}



