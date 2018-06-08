function addFormDataToList() {

	var title = document.getElementById('title').value;
    var date = document.getElementById('date').value;
	taskManager.add(1, title, date, false);
    displayTasks(taskManager.getTasks());

}

function deleteSelectedTasks() {

    var checkboxes = document.getElementsByName("chkbox");
    for (index = checkboxes.length-1; index >= 0; index--) {
        if(checkboxes[index].checked){
            taskManager.deleteTask(index);
        }
    }
    displayTasks(taskManager.getTasks());

}

function changeStatusSelectedTasks() {

    var checkboxes = document.getElementsByName("chkbox");
    for (index = 0; index < checkboxes.length; index++) {
        if(checkboxes[index].checked) {
            taskManager.changeStatus(index);
        }
    }
    displayTasks(taskManager.getTasks());

}

function createCheckBox() {

    var checkBoxElement = document.createElement("input");
    checkBoxElement.type = "checkbox";
    return checkBoxElement;

}

function selectAll() {

    var checkboxes = document.getElementsByName("chkbox");
    var selectAllTasks = document.getElementById("selectAll");
    for (index = 0; index < checkboxes.length; index++) {
            checkboxes[index].checked = selectAllTasks;
    }

}

function filterTasks() {
    var filterInputBox = document.getElementById("search");
    var selectedOption = filterInputBox.options[filterInputBox.selectedIndex].value;

    var selectedTasks = null;

    if(selectedOption == "true" ){
        selectedTasks = taskManager.getTaskByStatus(true);
    } else if(selectedOption == "false" ){
        selectedTasks = taskManager.getTaskByStatus(false);
    } else {
        selectedTasks = taskManager.getTasks();
    }

    displayTasks(selectedTasks);
}

function computeDaysLeftFromToday(dueDate) {
    var today = new Date();
    var dueTime = Math.abs(dueDate.getTime() - today.getTime());
    var daysLefts = Math.ceil(dueTime / (1000*3600*24));

    if(daysLefts == 1){
        dueDaysValue = "Due today";
    } else {
        dueDaysValue = daysLefts + "days left";
    }
    return dueDaysValue;
}


function createBaseTable() {
    var viewElement =  document.getElementById("taskView");
    viewElement.innerHTML = "";

    var tableHeader = document.createElement("tr");

    var checkbox = createCheckBox();
    checkbox.setAttribute("id", "selectAll");
    checkbox.setAttribute("value", true);
    checkbox.onclick = selectAll;

    var checkBoxElement = document.createElement("td");
    checkBoxElement.appendChild(checkbox);

    var titleElement = document.createElement("td");
    titleElement.append("TITLE");

    var dateElement = document.createElement("td");
    dateElement.append("DUE DATE");

    var statusElement = document.createElement("td");
    statusElement.append("STATUS");

    tableHeader.appendChild(checkBoxElement);
    tableHeader.appendChild(titleElement);
    tableHeader.appendChild(dateElement);
    tableHeader.appendChild(statusElement);    

    viewElement.appendChild(tableHeader);

    return viewElement;
}

function displayTasks(tasks) {

    var viewElement = createBaseTable();

    var index = 0;
    for(index = 0; index < tasks.length; index++) {
        var tr = document.createElement("tr");
        var checkbox = createCheckBox();
        checkbox.setAttribute("id", index);
        checkbox.setAttribute("name", "chkbox");
        
        var checkBoxElement = document.createElement("td");
        checkBoxElement.appendChild(checkbox);

        var titleElement = document.createElement("td");
        titleElement.append(tasks[index].title);

        var dateElement = document.createElement("td");
        dueDate = new Date(tasks[index].date);
        var daysLeft = computeDaysLeftFromToday(dueDate);
        dateElement.append(daysLeft);


        var statusElement = document.createElement("td");
        if(tasks[index].status == true) {
            statusElement.append('Completed');
        } else {
            statusElement.append('In Progress');
        }

        tr.appendChild(checkBoxElement);
        tr.appendChild(titleElement);
        tr.appendChild(dateElement);
        tr.appendChild(statusElement);

        viewElement.appendChild(tr);
    }      

}
    
    
