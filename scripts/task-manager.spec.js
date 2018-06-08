var TaskManager = require('./task-manager');

describe('TaskManager', function () {
  var taskManager;

  beforeEach(function () {
    taskManager = new TaskManager();
  });

  it('initially task manger will have an empty array of objects', function () {
    expect(taskManager.getTasks()).toEqual([]);
  });

  it('adding a task adds it to the list of tasks', function () {
    taskManager.add(1, 'title1', 'completed');
    var expectedDb = [{ id: 1, title: 'title1', status: 'completed'}];
    expect(taskManager.getTasks()).toEqual(expectedDb);
  });

  it('getting a task by title return one task based on the title', function () {
    taskManager.add(1, 'title1', 'completed');
    var expectedDb = { id: 1, title: 'title1', status: 'completed'};
    expect(taskManager.getTaskByTitle('title1')).toEqual(expectedDb);
  });

  it('getting a task by status return one task based on the status', function () {
    taskManager.add(1, 'title1', 'completed');
    var expectedDb = { id: 1, title: 'title1', status: 'completed'};
    expect(taskManager.getTaskByStatus('completed')).toEqual(expectedDb);
  });

  it('getting a task when title given as input doesnt exist will return null', function () {
    taskManager.add(1, 'title1', 'completed');
    var expectedDb = null;
    expect(taskManager.getTaskByTitle('title2')).toEqual(expectedDb);
  });

  it('getting a task when status given as input doesnt exist will return null', function () {
    taskManager.add(1, 'title1', 'completed');
    var expectedDb = null;
    expect(taskManager.getTaskByStatus('title2')).toEqual(expectedDb);
  });

  it('getting a task by id return one task based on the id', function () {
    taskManager.add(1, 'title1', 'completed');
    var expectedDb = { id: 1, title: 'title1', status: 'completed'};
    expect(taskManager.getTaskById(1)).toEqual(expectedDb);
  });

  it('getting a task when id given as input doesnt exist will return null', function () {
    taskManager.add(1, 'title1', 'completed');
    var expectedDb = null;
    expect(taskManager.getTaskById(2)).toEqual(expectedDb);
  });

  it('deleting a task deletes it from the list of tasks', function () {
    taskManager.add(1, 'task-1', 'in-progress');
    taskManager.add(2, 'task-2', 'in-progress');
    taskManager.add(3, 'task-3', 'in-progress');
    taskManager.deleteTask(2);
    var expectedDb = [{ id: 1, title: 'task-1', status: 'in-progress'}, { id: 3, title: 'task-3', status: 'in-progress'}];
    expect(taskManager.getTasks()).toEqual(expectedDb);
  });

  it('updating a task first finds the particular task by id and then updates the other details except id of the particular task', function () {
    taskManager.add(1, 'task-1', 'in-progress');
    taskManager.add(2, 'task-2', 'in-progress');
    taskManager.updateTask(2, 'task-updated', 'completed');
    var expectedDb = [{ id: 1, title: 'task-1', status: 'in-progress'}, { id: 2, title: 'task-updated', status: 'completed'}];
    expect(taskManager.getTasks()).toEqual(expectedDb);
  });

});
