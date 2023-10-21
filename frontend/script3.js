!function(e){"function"!=typeof e.matches&&(e.matches=e.msMatchesSelector||e.mozMatchesSelector||e.webkitMatchesSelector||function(e){for(var t=this,o=(t.document||t.ownerDocument).querySelectorAll(e),n=0;o[n]&&o[n]!==t;)++n;return Boolean(o[n])}),"function"!=typeof e.closest&&(e.closest=function(e){for(var t=this;t&&1===t.nodeType;){if(t.matches(e))return t;t=t.parentNode}return null})}(window.Element.prototype);
document.addEventListener('DOMContentLoaded', function() {
    

    let nameOfTeam = document.getElementById("NameOfTeam");

    nameOfTeam.addEventListener("click", function(event) {
      event.preventDefault();

      window.location.replace('index.html');

    });

    initDragula();
});

async function getSingleTask(task_id) {
  const rawResponse = await fetch("http://192.168.43.68:5000/tasks/" + task_id);
  const content = await rawResponse.json();

  return content;
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
