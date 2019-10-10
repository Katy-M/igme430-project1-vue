// Heading component that displays the name of the application and the create card button
Vue.component('vueheading', {
    props: ['title'],
    template: `
    <div class="row justify content center">
        <h1>{{ title }}</h1>
    </div>
    `,
});

Vue.component('vuecolumn', {
    props: ['title'],
    template: `
    <div class="col-lg-4 col-md-4 column" id="todo">
        <h2>{{ title }}</h2>
        <vuecard title="Example card" desc="Uwu"></vuecard>
    </div>
    `,
});

Vue.component('vuecard', {
    props: ['title','desc', 'duedate', 'priority'],
    template: `
    <div class="card container-fluid" id="todo">
        <h3>{{ title }}</h3>
        <ul>
            <li class="due">Due Date</li>
            <li class="priority">
                Priority Level: {{ priority }}
            </li>
            <li class="desc">
                <p>{{ desc }}</p>
            </li>
        </ul>
        <button>Edit Card</button>
    </div>
    `,
});

Vue.component('createform', {
    props: [],
    template: `
    <form @submit=>
        Title of Card:
        <input type="text" name="title"><br>
        Due Date:
        <input type="date" name="duedate"><br>
        Priority Level:
        <input type="number" name="priority"><br>
        Description:
        <input type="text" name="desc"><br>
        Status:
        <select name="status">
            <option value="todo">To-Do</option>
            <option value="inprogress">In Progress</option>
            <option value="completed">Completed</option>
        </select><br>
        <button type="submit" id="createbutton">Create New Card</button>
    </form>
    `,
    methods: {
        requestCreate = (e, nameForm) => {
            // grab name and age fields
            const name = nameForm.querySelector('#nameField').value;
            const age = nameForm.querySelector('#ageField').value;
        
            //create a new AJAX request (asynchronous)
            const xhr = new XMLHttpRequest();
            //setup connect using the selected method and url
            xhr.open('POST', '/addUser', true);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.setRequestHeader ('Accept', 'application/json');
            
            xhr.onload = () => handleResponse(xhr, true);
        
            xhr.send(`name=${name}&age=${age}`);
        
            e.preventDefault();
            return false;
          },
    },
})

var app = new Vue({
    el: '#app',
    data: {},
})

// for POST request to create a new user
const requestCreate = (e, nameForm) => {
    // grab name and age fields
    const name = nameForm.querySelector('#nameField').value;
    const age = nameForm.querySelector('#ageField').value;

    //create a new AJAX request (asynchronous)
    const xhr = new XMLHttpRequest();
    //setup connect using the selected method and url
    xhr.open('POST', '/addUser', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader ('Accept', 'application/json');
    
    xhr.onload = () => handleResponse(xhr, true);

    xhr.send(`name=${name}&age=${age}`);

    e.preventDefault();
    return false;
  };