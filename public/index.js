const input = document.querySelector('.input-task');
const submit = document.querySelector('.submit');
const output = document.querySelector('.output');
const success = document.querySelector('.success');

submit.addEventListener('click', async () => {
    let task = input.value;
    try {
        await axios.post('/api/v1/tasks', { name: task });
        input.value = '';
        success.style.display = 'block';
        success.textContent = 'Successfully Added';
        success.classList.add('text-success');
    } catch (error) {
        success.style.display = 'block';
        success.textContent = 'Task Cannot Be Empty';
        success.classList.add('text-failure');
    }
    setTimeout(() => {
        success.style.display = 'none';
        success.textContent = '';
        success.classList.remove('text-successs');
        success.classList.remove('text-failure'); 
    }, 3000)
    getData();
});

const getData = async () => {
    const { data: { tasks } } = await axios.get('/api/v1/tasks');
    let result = '';
    tasks.forEach(element => {
        if (element.completed) {
            const div = `<div class = "single-task single-task-completed" onclick="update('${!element.completed}','${element._id}','${element.name}')" ondblclick="deleteTask('${element._id}')">${element.name}
            </div>`;
            result += div;
        }
        else {
            const div = `<div class = "single-task" onclick="update('${!element.completed}','${element._id}','${element.name}')" ondblclick="deleteTask('${element._id}')">${element.name}
            </div>`;
            result += div;
        }
    });
    output.innerHTML = result;
}
getData();

const update = async (completed, id, name) => {
    await axios.patch(`/api/v1/tasks/${id}`, {
        name: name,
        completed: completed,
    });
    getData();
}



const deleteTask = async (id) => {
    await axios.delete(`/api/v1/tasks/${id}`);
    success.style.display = 'block';
    success.textContent = 'Task Deleted';
    success.classList.add('text-failure');
    setTimeout(() => {
        success.style.display = 'none';
        success.textContent = '';
        success.classList.remove('text-failure'); 
    }, 3000)
    getData();
}