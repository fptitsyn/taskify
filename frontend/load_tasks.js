(async () => {
    const rawResponse = await fetch("http://192.168.43.68:5000/tasks");
    const content = await rawResponse.json();

    for (var i = 0; i < content["tasks"].length; i++) {
        var title = content["tasks"][i]["title"];
        var desc = content["tasks"][i]["content"];
        let taskId = content["tasks"][i]["id"];
        let taskStatus = content["tasks"][i]["status"];
        let taskElem = document.createElement("li");
        taskElem.id = taskId;
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

        tasksColumn = document.getElementById("to-do");

        switch(taskStatus) {
          case "in-work":
            tasksColumn = document.getElementById("in-work");
            break;
          case "testing":
            tasksColumn = document.getElementById("testing");
            break;
          case "polishing":
            tasksColumn = document.getElementById("polishing");
            break;
          case "done":
            tasksColumn = document.getElementById("done");
            break;
          default:
            tasksColumn = document.getElementById("to-do");
        }
        
        tasksColumn.append(taskElem);
    }     
  })();