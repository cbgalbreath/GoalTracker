//Model
//if data is in JSON file, pull from JSON file.
//Otherwise, use default array.

let goals = [];
let loadElement;
const today = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate(); //establishes "today"
const savedGoals = JSON.parse(localStorage.getItem('goals')); //calls on JSON file "goals" if it exists
      if (Array.isArray(savedGoals)){
        goals = savedGoals; //if file exists, data put into goals variable
           
      }

      if (goals.length == 0){
        loadElement = document.getElementById("new-goallist");
      }
      else{
        loadElement = document.getElementById("upcominglist");
      }
      loadElement.style.display = 'block';
      


//creates an entry into the goal list.
function createGoal(goal, dueDate){
    const id = new Date().getTime(); //sets an id for the goal
    const taskid = new Date().getTime(); //sets an id for task
    goals.push({name: goal, dueDate: dueDate, id: id, tasks: [{name: "Delete this Task", dueDate: today, taskid: taskid}]}); //pushes new entry into goals array.
    
    saveGoals(); //saves new info into JSON file
}
//creates new task
function createTask(task, dueDate, idCheck){
    goals.forEach(function (goal) {
    if (goal.id == idCheck){ //checks if putting task into correct goals entry
        const taskid = new Date().getTime(); //new task's id
        goal.tasks.push({name: task, dueDate: dueDate, taskid: taskid}); //pushes new entry into tasks array
    }
    })

    saveGoals(); // saves new info to JSON file.
}




//removes item from goals list.
function removeGoal(idToDelete) {
    goals = goals.filter(function (goal) {
        if (goal.id == idToDelete){ //checks if goal id matches
            return false; //if it does, item will be removed
        }
        else{
            return true; //adds all other entries back to array
        }
    });
    
    saveGoals(); //saves JSON file
}

//removes task from array
function removeTask(idToDelete){
    goals.forEach(function (goal){
        tasks = goal.tasks.filter(function (task){
            if (task.taskid == idToDelete){
                return false;
            }
            else{
                return true;
            }
        });
        goal.tasks = tasks;
    });
    saveGoals();  // saves JSON file.
}
      


//saves goal list to JSON file.
function saveGoals(){
    localStorage.setItem('goals', JSON.stringify(goals)); //saves goals object to JSON file
}

//view
//displays the list on web page.

//creates the NavBar
function displayNavBar(){ 
    const navElement = document.getElementById('navbar');
    eraseElement(navElement); //erases everything inside 'navbar'

    let label = "Upcoming Tasks"; //labels upcoming tasks tab
    let id = "upcoming";
    navElement.appendChild(createTabButton(label, id)); // adds Up[]
    goals.forEach(function (goalItem) {
        navElement.appendChild(createTabButton(goalItem.name, goalItem.id)); //calls creates TabButton for each goal
    })
    label = "+";
    id = "new-goal";
    navElement.appendChild(createTabButton(label, id));
    
}


//creates buttons for navigation tabs.
function createTabButton(label, id){

    //creates each tab
    const tab = document.createElement('div');
    tab.innerText = label;
    tab.id = id + 'tab';
    tab.class = "tabs";
    tab.addEventListener("click", function() {
        const idMatch = id;
        const sections = document.querySelectorAll('.section');
        console.log(sections);
        sections.forEach(function(section){
            section.style.display = "none";
            if (section.id == idMatch + 'list'){
                section.style.display = "block";
            }
        });
    });

    return tab;
} 

//creates task list for each goal
function displayTasks(){
    const element = document.getElementById('goal-lists');
    eraseElement(element); //erases the internal HTML

    goals.forEach(function (goal){
        const listElement = document.createElement('div')
        listElement.classList.add('section');
        listElement.id = goal.id + 'list';
        listElement.appendChild(createTaskForm(goal.id)); //creates form for tasks
        const listDue = "Due: " + goal.dueDate; //Goal's Due Date
        listElement.append(listDue);

        //Delete Goal button
        const deleteGoalButton = document.createElement('button');
        deleteGoalButton.onclick = deleteGoal;
        deleteGoalButton.innerText = "Delete Goal";
        deleteGoalButton.id = goal.id;
        deleteGoalButton.style = "margin-left: 12px";
        deleteGoalButton.type = 'button';
        deleteGoalButton.class = 'delete';
        listElement.appendChild(deleteGoalButton);

        //Goal's Task List
        const goalList = document.createElement('div');
            goal.tasks.forEach(function (task){
            const taskLine = document.createElement('div')
            taskLine.appendChild(listTasks(task)); //adds task info to line

                //creates Delete Task button
            const deleteTaskButton = document.createElement('button');
            deleteTaskButton.type = 'button';
            deleteTaskButton.id = task.taskid;
            deleteTaskButton.onclick = deleteTask;
            deleteTaskButton.innerText = "Delete Task";
            deleteTaskButton.style = "margin-left: 12 px";
            deleteTaskButton.class = 'delete';
            taskLine.appendChild(deleteTaskButton); //sets Delete Task button to end of line

            goalList.appendChild(taskLine); //adds task line to list
        })
        listElement.appendChild(goalList);  
        element.appendChild(listElement);  //adds full list
    })
}

function createTaskForm(id){
    //Task form
    const form = document.createElement('form')
    const taskLabel = document.createElement('label')

    //label for task textbar
    taskLabel.for = 'task';
    taskLabel.innerText = "Enter Task: "
    form.appendChild(taskLabel);
    //task textbar
    taskText = document.createElement('input');
    taskText.class = "text";
    taskText.id = id + 'text';
    taskText.title = 'task';
    taskText.type = "text";
    form.appendChild(taskText);

    // Task Due Date picker label
    const taskDueDateLabel = document.createElement('label');
    taskDueDateLabel.for = 'task-due-date';
    taskDueDateLabel.innerText = "Due Date: "
    form.appendChild(taskDueDateLabel);

    // Task Due Date Picker
    const taskDueDate = document.createElement('input');
    taskDueDate.title = 'task-due-date';
    taskDueDate.id = id + "dueDatePicker";
    taskDueDate.class = "date";
    taskDueDate.type = "date";
    form.appendChild(taskDueDate);

    //add task button
    const addButton = document.createElement('button');
    addButton.id = id;
    addButton.type = 'button';
    addButton.innerText = "Add Task";
    addButton.onclick = addTask;
    addButton.style = "margin-left: 12px;"
    form.appendChild(addButton);

    //sends form back to function who called it
    return form;
}

function listTasks(task){

    //lists task items
    const taskItem = document.createElement('div');
    taskItem.innerText = task.name + " Due: " + task.dueDate;
    taskItem.id = task.taskid + 'item';

    //returns task item line back to previous task.
    return taskItem;
}

function displayDueToday(goalsObj){
    element = document.getElementById('today-task');
    eraseElement(element); //erases internal HTML

    element.append("Due Today: "); //adds label "Due Today:"
    goalsObj.forEach(function(goalItem){
        goalItem.tasks.forEach(function (taskItem){
        if (taskItem.dueDate == today ){ //checks if task is due today
            const taskName = document.createElement('div');
            taskName.innerText = taskItem.name;
            element.appendChild(taskName);  //if task is due today, it is added to daily task list.
        }
    })
})
}

function eraseElement(element){
    element.innerHTML = ""; //erases the internal HTML
}

displayNavBar(); //displays navbar on load.
displayDueToday(goals); //displays Daily Task list
displayTasks(); //displays task list for each goal.

//Controller

//adds items to Goal list upon clicking Add button.
function addGoal(){
    const goal = document.getElementById('goal').value;  //pulls goal from text box
    const dueDate = document.getElementById('date-picker').value; //pulls due date from date picker
    createGoal(goal, dueDate); //add goal to goal list.
    displayNavBar(); //displays navbar with new tab
    displayDueToday(goals); //displays updated goal daily list
    displayTasks(); //displays updated task lists 
}

//add task to a goal
function addTask(event){
    const addButton = event.target;
    const id = addButton.id;
    const task = document.getElementById(id + 'text').value;
    const taskDueDate = document.getElementById(id +'dueDatePicker').value;

    createTask(task, taskDueDate, id);
    displayDueToday(goals);
    displayTasks();
}
//deletes a goal
function deleteGoal(event){
    const deleteButton = event.target;
    const idToDelete = deleteButton.id;
    removeGoal(idToDelete);
    displayNavBar();
    displayDueToday(goals);
    displayTasks();
    if (goals.length == 0)
    {
        const element = document.getElementById(goal-form);
        element.class += ' active';
    }
}

//deletes a task
function deleteTask(event){
    const deleteButton = event.target;
    const idToDelete = deleteButton.id;

    removeTask(idToDelete);
    displayDueToday(goals);
    displayTasks();
}
