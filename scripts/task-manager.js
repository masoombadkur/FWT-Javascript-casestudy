function TaskManager() { 
	
}

TaskManager.prototype.tasks = [];

TaskManager.prototype.getTasks = function() { 
	return this.tasks;
}

TaskManager.prototype.add = function(id, title, date, status) {
	var task = {};
	task.id = id;
	task.title = title;
    task.date = date;
	task.status = status;
	this.tasks.push(task);
}

TaskManager.prototype.changeStatus = function(position) {
    this.tasks[position].status = !this.tasks[position].status;
}

TaskManager.prototype.deleteTask = function(position) {
    this.tasks.splice(position,1);
}

TaskManager.prototype.getTaskByStatus = function(status) {
    var taskList = this.getTasks();
    var selectedTasks = [];

    for (var i = 0; i < taskList.length; i++) {
        if(taskList[i].status == status){
            selectedTasks.push(taskList[i]);
        }
    }
    return selectedTasks;
}

//module.exports = TaskManager;

