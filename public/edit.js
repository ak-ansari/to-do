const input = document.querySelector("#task");
const id_span = document.querySelector(".id_span");
const checkbox = document.querySelector(".check");
const update_btn = document.querySelector(".update_btn");
const home_btn = document.querySelector(".home_btn");
const loading = document.querySelector("#loading");
const failed = document.querySelector("#failed");
const success = document.querySelector("#success");
const text = document.querySelector("#text");
const id = localStorage.getItem('id');

id_span.innerHTML = id;
const url = `https://taskmanagerapp-by-ak.herokuapp.com/api/v1/tasks/${id}`;
// const url = `http://localhost:3000/api/v1/tasks/${id}`;
const getSingleTask = async (id) => {
  const {
    data: { task },
  } = await axios.get(url);
  const { name, completed } = task;
  console.log(task);
  input.value = name;
  checkbox.checked = completed;
};
getSingleTask();

const update = async () => {
  let editedTask = input.value;
  let editedComplete = checkbox.checked;
  if (!editedTask) {
    failed.innerHTML = "Plese provide a valid task";
    setTimeOutFun(failed);
    return;
  }
  try {
     text.innerHTML = "";
     loading.classList.remove("d-none");

     const { data } = await axios.patch(url, {
       name: editedTask,
       completed: editedComplete,
     });
     success.innerHTML='Task updated : )';
     setTimeOutFun(success);
     console.log(data);
    
  } catch (error) {
    failed.innerHTML=error;
    setTimeOutFun(failed)
    
  }
  finally{
    loading.classList.add('d-none');
    text.innerHTML='Update'
  }
 
};
update_btn.addEventListener("click", update);
const home = () => {
  window.location.href = "https://taskmanagerapp-by-ak.herokuapp.com/";
  // window.location.href = "http://localhost:3000/";
};
home_btn.addEventListener("click", home);
function setTimeOutFun(domName) {
  setTimeout(() => {
    domName.innerHTML = "";
  }, 3000);
}
