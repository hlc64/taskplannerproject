const validFormFieldInput = (data) => {
  const taskName = document.querySelector("#taskName");
  const assignedTo = document.querySelector("#assignedTo");
  const dueDate = document.querySelector("#dueDate");
  const taskStatus = document.querySelector("#taskStatus");
  const descriptionBox = document.querySelector("#descriptionBox");

  if (taskName.value.length <= 5) {
    taskName.classList.remove("is-valid");
    taskName.classList.add("is-invalid");
  } else {
    taskName.classList.remove("is-invalid");
    taskName.classList.add("is-valid");
  }

  if (assignedTo.value.length <= 5) {
  }

  if (dueDate.value.length === 0) {
  }

  if (taskStatus.value.length === 0) {
  }

  if (descriptionBox.value.length <= 5) {
  }

  // console.log(dueDate)
};

document.querySelector('form').onsubmit = () => {
  validFormFieldInput(); 
  return false; 
}

// document.querySelector("#btnSubmit").onclick = validFormFieldInput;

  window.addEventListener('load', function() {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function(form) {
      form.addEventListener('submit', function(event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    });
  }, false);
