const input = document.querySelector("#task");
const loading = document.querySelector("#loading");
const text = document.querySelector("#text");
const success = document.querySelector("#success");
const failed = document.querySelector("#failed");
const submit_btn = document.querySelector(".submit_btn");
const display_tasks = document.querySelector("#display_tasks");
const noTask = document.querySelector("#noTask");
const baseUrl = "https://taskmanagerapp-by-ak.herokuapp.com";
// const baseUrl = "http://localhost:3000";
const apiSuffix = "/api/v1/tasks/";

getAllTasks();
async function getAllTasks() {
  try {
    const {
      data: { tasks },
    } = await axios.get(baseUrl+apiSuffix);
    let taskLength=tasks.length
    console.log(tasks)
    if (taskLength===0) {
      display_tasks.innerHTML = '<h4 class="my-3" id="noTask"> No task present ......</h4>'
      return
    }
    for (let data of tasks) {
      let { _id: id, name, completed } = data;
      let crossed = "";
      if (completed === true) {
        crossed = "crossed";
      }
      let html = `    <div class="inner d-flex  justify-content-between my-2 bg-light container-fluid">
           <h5 class="${crossed}">${name}</h5>
           <div>
            <i class="bi bi-pencil-square mx-2" id="${id}" onclick="editTask(this.id)"></i>
            <i class="bi bi-trash3 mx-2" id="${id}" onclick="deleteTask(this.id)"></i>
           </div>
           

        </div>`;
      const div = document.createElement("div");
      div.classList.add("task_div");

      div.innerHTML = html;
      display_tasks.appendChild(div);
    }
  } catch (error) {
    failed.innerHTML = error;
    setTimeOutFun(failed);
  }
}

const submit = async () => {
  
  loading.classList.remove("d-none");
  text.innerHTML = "Creating...";
  const newTask = input.value;
  if (!newTask) {
    failed.innerHTML = "please enter a task!!";
    loading.classList.add("d-none");
    text.innerHTML = "Create";
    setTimeOutFun(failed);
    return;
  }
  try {
    let uri=baseUrl+apiSuffix
    const { data } = await axios.post(uri, { name: newTask });
    success.innerHTML = "task added successfully : )";
    display_tasks.innerHTML = "";
    await getAllTasks();
    setTimeOutFun(success);
    console.log(data);
  } catch (error) {
    failed.innerHTML = error;
    setTimeOutFun(failed);
  } finally {
    input.value = "";
    loading.classList.add("d-none");
    text.innerHTML = "Create";
  }
};
submit_btn.addEventListener("click", submit);
input.addEventListener("keyup", (e) => {
  if (e.key == "Enter") {
    submit()
  }
});

const editTask = async (id) => {
  localStorage.setItem("id", id);
  window.location.href = `/edit.html?id=${id}`;
};
const deleteTask = async (id) => {
  let idString=id.toString();
  success.innerHTML = "Loading....";
  try {
    const data = await axios.delete(baseUrl+apiSuffix+idString);
    console.log(data);
    display_tasks.innerHTML = "";
    success.innerHTML = "Task deleted successfully";
    setTimeOutFun(success);
    await getAllTasks();
  } catch (error) {
    success.innerHTML = "";
    failed.innerHTML = error;
    setTimeOutFun(failed);
  }
};

function setTimeOutFun(domName) {
  setTimeout(() => {
    domName.innerHTML = "";
  }, 3000);
}
