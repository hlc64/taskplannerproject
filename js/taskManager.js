const statusMap = {
  '1': 'To do',
  '2': 'In progress',
  '3': 'Review',
  '4': 'Done'
};

const statusClass = {
  '1': 'taskStatusToDo',
  '2': 'taskStatusInProgress',
  '3': 'taskStatusReview',
  '4': 'taskStatusDone',
}

const iconClass = {
  'meng': 'icon-meng',
  'hayley': 'icon-hayley'
}

const createTaskHtml = (name, description, assignedTo, dueDate, status) => {
  const html = `
    <li class="list-group-item card p-0 m-0 mb-3 border-1 rounded-3">
    <a data-bs-toggle="collapse" href="#card-collapse-1">

      <div class="card-header m-0">
        ${name}
      </div>
    </a>
    <div class="collapse show" id="card-collapse-1">
      <div class="card-body">
        <h5 class="card-title">
          <div class="${iconClass[assignedTo.toLowerCase()]} me-2"></div> ${assignedTo}
        </h5>
        <p class="card-text">${dueDate}</p>
        <p class="card-text ${statusClass[status]}">${statusMap[status]}</p>
        <p class="card-text">${description}</p>
        </div>
      </div>
      <!-- </div> -->
    </li>
  `;
  return html;
};

class TaskManager {
  constructor(currentId = 0) {
    this._tasks = [];
    this._currentId = currentId;
  }

  get tasks() { return this._tasks; }

  addTask(name, description, assignedTo, dueDate, status) {
    this._currentId++;
    this._tasks.push(
      {
        id: this._currentId,
        name: name,
        description: description,
        assignedTo: assignedTo,
        dueDate: dueDate,
        status: status
      }
    );
  }
  render() {
    const htmlListToDo = [];
    const htmlListInProgress = [];
    const htmlListReview = [];
    const htmlListDone = [];
    for (const task of hmTaskManager.tasks) {
      const date = new Date(task.dueDate);
      const formattedDate = date.toDateString();
      console.log(formattedDate);
      const taskHtml = createTaskHtml(
        task.name,
        task.description,
        task.assignedTo,
        formattedDate,
        task.status
      )
      switch (task.status) {
        case '1':
          htmlListToDo.push(taskHtml);
          break;
        case '2':
          htmlListInProgress.push(taskHtml);
          break;
        case '3': 
          htmlListReview.push(taskHtml);
          break;
        case '4':
          htmlListDone.push(taskHtml);
          break;
        default: 
          console.error('Status not found');
      }
   }
   const toDoHtml = htmlListToDo.join('\n');
   const inProgressHtml = htmlListInProgress.join('\n');
   const reviewHtml = htmlListReview.join('\n');
   const doneHtml = htmlListDone.join('\n'); 
   document.querySelector('#toDoList').innerHTML = toDoHtml;
   document.querySelector('#inProgressList').innerHTML = inProgressHtml;
   document.querySelector('#reviewList').innerHTML = reviewHtml;
   document.querySelector('#doneList').innerHTML = doneHtml;
  }
}

