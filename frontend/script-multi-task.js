document.addEventListener('DOMContentLoaded', function() {
    let addTaskButton = document.getElementById("addTaskButton");
    let newModalWindow = document.getElementById("modal-task-window");
    let btnForPush = document.getElementById("btnForPush");
    let name = document.getElementById("name");
    let nameOfTeam = document.getElementById("NameOfTeam");

    nameOfTeam.addEventListener("click", function(event) {
        event.preventDefault();
  
        window.location.replace('index.html');
      });
  

    name.addEventListener("click", function(event) {
      event.preventDefault();

      window.location.replace('index3.html');
    });

    addTaskButton.addEventListener("click", function(e) {
        e.preventDefault();

        newModalWindow.classList.add("modal-window-active");
        newModalWindow.classList.remove("invisible");

        this.classList.add("buttonMove");
    });

    btnForPush.addEventListener("click", async function(e) {
        e.preventDefault();

        let wholeTitle = document.getElementById("getWholeTitle").value;

        let firstTitle = document.getElementById("getTaskTitle1").value;
        let firstContent = document.getElementById("getTaskContent1").value;
        let firstReceiver = document.getElementById("getTaskReceiver1").value;
        let firstPriority = document.getElementById("getTaskPriority1").value;

        let secondTitle = document.getElementById("getTaskTitle2").value;
        let secondContent = document.getElementById("getTaskContent2").value;
        let secondReceiver = document.getElementById("getTaskReceiver2").value;
        let secondPriority = document.getElementById("getTaskPriority2").value;

        let task = {
            "task": {
            "content": firstTitle + "\n" + secondTitle, 
            "creator": "creator",
            "receiver": firstReceiver,
            "priority": firstPriority,
            "status": "to-do", 
            "title": wholeTitle
            }
        };

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

            window.location.replace("index.html");
        })();
    });
});