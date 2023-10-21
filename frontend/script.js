!function(e){"function"!=typeof e.matches&&(e.matches=e.msMatchesSelector||e.mozMatchesSelector||e.webkitMatchesSelector||function(e){for(var t=this,o=(t.document||t.ownerDocument).querySelectorAll(e),n=0;o[n]&&o[n]!==t;)++n;return Boolean(o[n])}),"function"!=typeof e.closest&&(e.closest=function(e){for(var t=this;t&&1===t.nodeType;){if(t.matches(e))return t;t=t.parentNode}return null})}(window.Element.prototype);
document.addEventListener('DOMContentLoaded', function() {
    

    var addNewTask = document.getElementById('addTaskButton');
    let modalWindow = document.getElementById("modalWindow");
    let toBlur = document.getElementById("toBlur");
    let overlay = document.getElementById("overlay-modal");
    let name = document.getElementById("name");

    name.addEventListener("click", function(event) {
      event.preventDefault();

      window.location.replace('index3.html');

    });

    let getTaskTitleInput = document.getElementById("getTaskTitle");
    let getTaskContentInput = document.getElementById("getTaskContent");
    let getTaskPriorityInput = document.getElementById("getTaskPriority");

    addNewTask.addEventListener("click", function(event) {
        event.preventDefault();
        
        modalWindow.classList.add("active");
        overlay.classList.add("active");
        toBlur.classList.add("blurred");
        document.getElementById("refactorBtn").classList.add("invisible");
    });

    overlay.addEventListener("click", function() {
      modalWindow.classList.remove('active');
      this.classList.remove("active");
      toBlur.classList.remove("blurred");

      getTaskTitleInput.value = "";
      getTaskContentInput.value = "";
      getTaskPriorityInput.value = "";
    });

    let createTaskButton = modalWindow.querySelector("#createTaskButton");

    createTaskButton.addEventListener("click", function(e) {
        e.preventDefault();

        let title = getTaskTitleInput.value;
        let desc = getTaskContentInput.value;
        let priority = getTaskPriorityInput.value;

        let task = {
                "task": {
                "content": desc, 
                "creator": "creator",
                "receiver": "receiver",
                "priority": priority,
                "status": "To-Do", 
                "title": title
                }
            };

        getTaskTitleInput.value = "";
        getTaskContentInput.value = "";
        getTaskPriorityInput.value = "";

        (async () => {
            const rawResponse = await fetch("http://192.168.43.68:5000/tasks/create", {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(task)
            });
            const content = await rawResponse.json();
          
            console.log(content);

            let taskId = content["task"]["id"];
            console.log(taskId);

            let taskElem = document.createElement("li");
            taskElem.classList.add("menu-item");
            taskElem.innerHTML = "<div class='home-task77884' id='" + taskId + "'type='button'>" +
        
            "<img type='button' src='public/playground_assets/rectangle1077886-xv6.svg' class='home-image12' />" +
                 
            "<textarea class='descTextareaCreated' id='TZ' readonly='true'>" +
              desc + 
            "</textarea>" +
            "<div class='home-text35'>" + title + 
            "<p id='getTaskId' class='invisible'>" + taskId + "</p></div>" +
            
            "<div class='home-tags'>" +
              "<div class='home-tag0577889'>" +
                "<span class='home-text36'>🔥</span>" +
              "</div>" +
              "<div class='home-tag04831108'>" +
                "<img src='public/playground_assets/rectangle11831109-yea.svg' alt='Rectangle11831109'" +
                  "class='home-image13' />" +
                "<span class='home-text37'>до 23.04.2022</span>" +
                "<img src='public/playground_assets/clock1831111-vhgb.svg' alt='clock1831111' class='home-image14' />" +
              "</div>" +
              "<div class='home-tag03831114'>" +
                "<img src='public/playground_assets/rectangle12831115-03h.svg' alt='Rectangle12831115'" +
                  "class='home-image15' />" +
                "<span class='home-text38'>#важно</span>" +
              "</div>" +
              "<div class='home-tag02831117'>" +
                "<img src='public/playground_assets/rectangle14831118-ipeu.svg' alt='Rectangle14831118'" +
                  "class='home-image16' />" +
                "<span class='home-text39'>#несрочно</span>" +
              "</div>" +
              "<div class='home-tag01831105'>" +
                "<img src='public/playground_assets/rectangle15831106-b9f.svg' alt='Rectangle15831106'" +
                  "class='home-image17' />" +
                "<span class='home-text40'>#остальные теги</span>" +
              "</div>" +
            "</div>" +
          
            "<div class='home-creatoravatar831270'>" +
              "<img" +
                "src='https://aheioqhobo.cloudimg.io/v7/_playground-bucket-v2.teleporthq.io_/93bdc4b9-bbe1-4dc3-99a5-d0cdb3121cff/5ea93324-8d40-4426-966b-6f584c486969?org_if_sml=14270'" +
                "class='home-image18' />" +
            "</div>" +
            "<div class='home-workeravatar831274'>" +
              "<img" +
                "src='https://aheioqhobo.cloudimg.io/v7/_playground-bucket-v2.teleporthq.io_/93bdc4b9-bbe1-4dc3-99a5-d0cdb3121cff/602e76ef-4d49-485c-9e52-b43d587066ea?org_if_sml=15480'" +
                "class='home-image19' />" +
            "</div>" +
          "</div>"
            let firstColumnTasks = document.getElementById("to-do");
            firstColumnTasks.append(taskElem);
        })();

        modalWindow.classList.remove("active");
        overlay.classList.remove("active");
        toBlur.classList.remove("blurred");
    });

    initDragula();
});

window.addEventListener("load", function(event) {
  openTask();
});

function loadTasks() {
  (async () => {
      const rawResponse = await fetch("http://192.168.43.68:5000/tasks");
      const content = await rawResponse.json();

      for (var i = 0; i < content["tasks"].length; i++) {
          var title = content["tasks"][i]["title"];
          var desc = content["tasks"][i]["content"];
          let taskId = content["tasks"][i]["id"];
          let taskElem = document.createElement("li");
          taskElem.classList.add("menu-item");
          taskElem.innerHTML = "<div class='home-task77884' id='" + taskId + "'type='button'>" + 
        
          "<img type='button' src='public/playground_assets/rectangle1077886-xv6.svg' class='home-image12' />" +
          

          "<textarea class='descTextareaCreated' id='TZ' readonly='true'>" +
            desc + 
          "</textarea>" +
          "<div class='home-text35'>" + title + 
            "<p id='getTaskId' class='invisible'>" + taskId + "</p>" +
            "</div>" +
          
          "<div class='home-tags'>" +
            "<div class='home-tag0577889'>" +
              "<span class='home-text36'>🔥</span>" +
            "</div>" +
            "<div class='home-tag04831108'>" +
              "<img src='public/playground_assets/rectangle11831109-yea.svg' alt='Rectangle11831109'" +
                "class='home-image13' />" +
              "<span class='home-text37'>до 23.04.2022</span>" +
              "<img src='public/playground_assets/clock1831111-vhgb.svg' alt='clock1831111' class='home-image14' />" +
            "</div>" +
            "<div class='home-tag03831114'>" +
              "<img src='public/playground_assets/rectangle12831115-03h.svg' alt='Rectangle12831115'" +
                "class='home-image15' />" +
              "<span class='home-text38'>#важно</span>" +
            "</div>" +
            "<div class='home-tag02831117'>" +
              "<img src='public/playground_assets/rectangle14831118-ipeu.svg' alt='Rectangle14831118'" +
                "class='home-image16' />" +
              "<span class='home-text39'>#несрочно</span>" +
            "</div>" +
            "<div class='home-tag01831105'>" +
              "<img src='public/playground_assets/rectangle15831106-b9f.svg' alt='Rectangle15831106'" +
                "class='home-image17' />" +
              "<span class='home-text40'>#остальные теги</span>" +
            "</div>" +
          "</div>" +
        
          "<div class='home-creatoravatar831270'>" +
            "<img" +
              "src='https://aheioqhobo.cloudimg.io/v7/_playground-bucket-v2.teleporthq.io_/93bdc4b9-bbe1-4dc3-99a5-d0cdb3121cff/5ea93324-8d40-4426-966b-6f584c486969?org_if_sml=14270'" +
              "class='home-image18' />" +
          "</div>" +
          "<div class='home-workeravatar831274'>" +
            "<img" +
              "src='https://aheioqhobo.cloudimg.io/v7/_playground-bucket-v2.teleporthq.io_/93bdc4b9-bbe1-4dc3-99a5-d0cdb3121cff/602e76ef-4d49-485c-9e52-b43d587066ea?org_if_sml=15480'" +
              "class='home-image19' />" +
          "</div>" +
          "</div>"
          let tasksColumn = document.getElementById("to-do");
          tasksColumn.append(taskElem);
      }     
    })();
}

async function getSingleTask(task_id) {
  const rawResponse = await fetch("http://192.168.43.68:5000/tasks/" + task_id);
  const content = await rawResponse.json();

  return content;
}

async function openTask() {
  let modalWindow = document.getElementById("modalWindow");
  let toBlur = document.getElementById("toBlur");
  let overlay = document.getElementById("overlay-modal");

  var allTasks = document.getElementsByClassName("home-text35");
    console.log(allTasks);
    console.log(allTasks.length);
    for (var i = 0; i < allTasks.length; i++) {
      console.log("1234");
      console.log(allTasks[i]);
      allTasks[i].addEventListener("click", async function(e) {
        e.preventDefault();

        let taskId = this.querySelector("#getTaskId").textContent;

        console.log(taskId);

        const content = await getSingleTask(taskId);

        console.log(content);

        let taskTitle = content["task"]["title"];
        let taskDesc = content["task"]["content"];
        let taskPriority = content["task"]["priority"];

        modalWindow.classList.add('active');
        overlay.classList.add('active');
        toBlur.classList.add('blurred');

        let modalTitle = modalWindow.querySelector("#getTaskTitle");
        let modalDesc = modalWindow.querySelector("#getTaskContent");
        let modalPriority = modalWindow.querySelector("#getTaskPriority");

        modalTitle.value = taskTitle;
        modalDesc.value = taskDesc;
        modalPriority.value = taskPriority;

        let updateTaskButton = document.querySelector("#refactorBtn");

        updateTaskButton.addEventListener("click", function(e) {
          e.preventDefault();

          taskDesc = modalDesc.value;
          taskTitle = modalTitle.value;
          taskPriority = modalPriority.value;

          let task = {
            "task": {
            "content": taskDesc, 
            "creator": "creator",
            "receiver": "receiver",
            "priority": taskPriority,
            "status": "To-Do", 
            "title": taskTitle
            }
        };

    modalTitle.value = "";
    modalDesc.value = "";
    modalPriority.value = "";

    (async () => {
        const rawResponse = await fetch("http://192.168.43.68:5000/tasks/" + taskId + "/edit", {
          method: 'PUT',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(task)
        });
          const content = await rawResponse.json();
        
          console.log(content);
        })();

        modalWindow.classList.remove("active");
        overlay.classList.remove("active");
        toBlur.classList.remove("blurred"); 
      }); 
    });
  }
}

function initDragula() {
  var drake = dragula([document.querySelector("#to-do"), document.querySelector('#in-work'), document.querySelector('#testing'), document.querySelector('#polishing'), document.querySelector('#done')]);

  drake.on("drop", async(el, target) => {
    let currTask = await getSingleTask(el.id);
    console.log(currTask);
    columnId = target.id;
    
    let taskStatusChangeRequest = {
      "task": {
        "status": columnId
      }
    };

    (async () => {
      const rawResponse = await fetch("http://192.168.43.68:5000/tasks/" + el.id + "/change-status", {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(taskStatusChangeRequest)
      });
        const content = await rawResponse.json();
      
        console.log(content);
      })();

  });
}
