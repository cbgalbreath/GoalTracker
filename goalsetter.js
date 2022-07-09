//Model
//if data is in JSON file, pull from JSON file.
//Otherwise, use default array.

let goals;

const savedGoals = JSON.parse(localStorage.getItem('goals'));
      if (Array.isArray(savedGoals)){
        goals = savedGoals;
      }
      else{
       goals = [{name: 'Create task', dueDate: '2022-12-31', id: 'id1'}, {name: 'Complete task', dueDate: '2022-12-31', id: 'id2'}];
      }


//creates an entry into the goal list.
function createGoal(goal, dueDate){
    const id = new Date().getTime;
    goals.push({name: goal, dueDate: dueDate, id: id});

    saveGoals();
}

//removes item from goals list.
function removeGoal(idToDelete) {
    goals = goals.filter(function (goal) {
        if (goal.id === idToDelete){
            return false;
        }
        else{
            return true;
        }
    });
    
    saveGoals();
}

//saves goal list to JSON file.
function saveGoals(){
    localStorage.setItem('goals', JSON.stringify(goals));
}

//view
//displays the list on web page.
function displayGoals(){
    document.getElementById('goal-list').innerHTML = " ";
    

    goals.forEach(function (goalItem) {
        const goal = document.createElement('div');
        goal.innerText = goalItem.name + " Due: " + goalItem.dueDate;

        const deleteButton = document.createElement('button');
        deleteButton.innerText = "Delete";
        deleteButton.style = 'margin-left: 12px';
        deleteButton.setAttribute("type", "button");
        deleteButton.onclick = deleteGoal;
        deleteButton.id = goalItem.id;
        goal.appendChild(deleteButton);


        const goalList = document.getElementById('goal-list');
        goalList.appendChild(goal);
    });
}

displayGoals(); //displays list upon loading

//Controller

//adds items to Goal list upon clicking Add button.
function addGoal(){
    const goal = document.getElementById('goal').value;
    const dueDate = document.getElementById('date-picker').value;
    createGoal(goal, dueDate);
    displayGoals();
}

//removes item from goals list upon clicking Delete.
function deleteGoal(event) {
    const deleteButton = event.target;
    const idToDelete = deleteButton.id;

    removeGoal(idToDelete);
    displayGoals();
}

