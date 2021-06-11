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

const createTaskHtml = (id, name, description, assignedTo, dueDate, status) => {
  const html = `
    <li class="list-group-item card p-0 m-0 mb-3 border-1 rounded-3" data-task-id="${id}">
      <a data-bs-toggle="collapse" href="#card${id}">

        <div class="card-header m-0">
          ${name}
        </div>
      </a>
      <div class="collapse show" id="card${id}">
        <div class="card-body">
          <h5 class="card-title">
            <div class="${iconClass[assignedTo.toLowerCase()]} me-2"></div> ${assignedTo}
          </h5>
          <p class="card-text">${dueDate}</p>
          <p class="card-text ${statusClass[status]}">${statusMap[status]}</p>
          <p class="card-text">${description}</p>
        </div>
        <div class="card-footer py-0 d-flex justify-content-end align-items-center">
          <i class="bi bi-check2-square card-icon card-icon-check mx-1"></i>
          <i class="bi bi-pencil-square card-icon card-icon-edit mx-1"></i>
          <i class="bi bi-trash card-icon card-icon-delete mx-1"></i>
        </div>
      </div>
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
      // console.log(formattedDate);
      const taskHtml = createTaskHtml(
        task.id,
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

  getTaskById(taskId) {
    return this.tasks.find(x => x.id === taskId);
    
    // for (let x in this.tasks) {
    //   if (x.id === taskId) {
    //     foundTask = x;
    //   }
    // }
  }

  addRandomTask() {
    const getRandomElement = (array) => array[Math.floor(Math.random() * array.length)];
    const getRandomInt = (startNumber, window) => startNumber + Math.floor( Math.random() * window );
    const randomDateString = () => `${getRandomInt(2021, 5)}-${getRandomInt(1, 12)}-${getRandomInt(1, 28)}`;

    const namesList = ['Create Cards / List Group', 'Implement Card Status', 'Mark as Done Buttons', 'Create Render Method'];
    const assignedToList = ['Meng', 'Hayley'];
    const statusList = ['1', '2', '3', '4'];

    const descList = [
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt aut unde exercitationem iusto odit quos consequuntur ducimus sequi veniam corporis? Saepe explicabo inventore voluptates, soluta impedit deleniti harum natus recusandae!',
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora culpa magnam animi nisi earum ipsam illo tempore cupiditate officia qui eos, reprehenderit aliquid dolor quam, cum libero? Quasi, tenetur fugit.',
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non, sed. Maxime incidunt, mollitia minima tempore minus nemo possimus? Cum voluptates eveniet assumenda fugit delectus sapiente. Eligendi placeat fugiat nulla excepturi?'
    ];

    this.addTask(
      getRandomElement(namesList),
      getRandomElement(descList),
      getRandomElement(assignedToList),
      randomDateString(),
      getRandomElement(statusList)
    );

  }
}
