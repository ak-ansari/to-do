const input = document.querySelector("#task");
const loading = document.querySelector("#loading");
const text = document.querySelector("#text");
const success = document.querySelector("#success");
const failed = document.querySelector("#failed");
const submit_btn = document.querySelector(".submit_btn");
const display_tasks = document.querySelector("#display_tasks");
const url = "https://taskmanagerapp-by-ak.herokuapp.com/api/v1/tasks";
// const url = "http://localhost:3000/api/v1/tasks";

getAllTasks();
async function getAllTasks() {
  try {
    const {
      data: { tasks },
    } = await axios.get(url);
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
    failed.innerHTML=error;
    setTimeOutFun(failed)
    
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
    setTimeOutFun(failed)
    return;
  }
  try {
    const { data } = await axios.post(url, { name: newTask });
    success.innerHTML='task added successfully : )'
    display_tasks.innerHTML = "";
    await getAllTasks();
    setTimeOutFun(success)
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

const editTask = async (id) => {
  localStorage.setItem("id", id);
   window.location.href = `/edit.html?id=${id}`;
};
const deleteTask = async (id) => {
  let uri = `https://taskmanagerapp-by-ak.herokuapp.com/api/v1/tasks/${id}`;
  // let uri = `http://localhost:3000/api/v1/tasks/${id}`;
  success.innerHTML='Loading....'
  try {
    const data=await axios.delete(uri)
    console.log(data)
    display_tasks.innerHTML = "";
    success.innerHTML='Task deleted successfully'
    setTimeOutFun(success)
    await getAllTasks();
    
  } catch (error) {
    success.innerHTML='';
    failed.innerHTML=error;
    setTimeOutFun(failed)
    
  }
  
};

function setTimeOutFun(domName){
  setTimeout(() => {
    domName.innerHTML=''
  }, 3000);
}
