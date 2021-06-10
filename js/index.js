const hmTaskManager = new TaskManager();




window.addEventListener('load', function () {
  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.getElementsByClassName('needs-validation');
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
        const html = createTaskHtml(
          taskName.value, 
          descriptionBox.value, 
          assignedTo.value, 
          dueDate.value,
          taskStatus.value
        );
        console.log(html);

        event.preventDefault();
        document.querySelector('form').reset();
        console.log(hmTaskManager.tasks);
      }
    }, false);
  });

  const today = new Date();
  const dueDate = document.querySelector('#dueDate');

  const yyyy = today.getFullYear();
  const mm = `0${ today.getMonth()+1 }`.slice(-2);
  const dd = today.getDate();

  const todaysDate = `${yyyy}-${mm}-${dd}`;
  dueDate.setAttribute('min', todaysDate);

}, false);
