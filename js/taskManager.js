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
          <div class="icon-meng me-2"></div> ${assignedTo}
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
        id: this.currentId,
        name: name,
        description: description,
        assignedTo: assignedTo,
        dueDate: dueDate,
        status: status
      }
    );
  }
}