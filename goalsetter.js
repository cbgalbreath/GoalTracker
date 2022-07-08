const goals = ['Create task', 'Complete task'];

displayGoals();

function addGoal(){
    const goal = document.getElementById('goal').value;
    goals.push(goal)
    displayGoals();
}

function displayGoals(){
    document.getElementById('goal-list').innerHTML = " ";
    

    goals.forEach(function (goalItem) {
        const goal = document.createElement('div');
        goal.innerText = goalItem;

        const goalList = document.getElementById('goal-list');
        goalList.appendChild(goal);
    });
}