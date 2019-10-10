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
    data: function(){
        return{
            title: 'enter title',
            duedate: '',
            priority: '',
            desc: '',
            status: '',
        }
    },
    template: `
    <form @submit="requestCreate">
        Title of Card:
        <input type="text" v-model="title"><br>
        Due Date:
        <input type="date" v-model="duedate"><br>
        Priority Level:
        <input type="number" v-model="priority"><br>
        Description:
        <input type="text" v-model="desc"><br>
        Status:
        <select v-model="status">
            <option value="todo">To-Do</option>
            <option value="inprogress">In Progress</option>
            <option value="completed">Completed</option>
        </select><br>
        <button type="submit" id="createbutton">Create New Card</button>
    </form>
    `,
    methods: {
        // POST request for creating a new card
        requestCreate(e){
            //create a new AJAX request (asynchronous)
            const xhr = new XMLHttpRequest();
            //setup connect using the selected method and url
            xhr.open('POST', '/createCard', true);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.setRequestHeader ('Accept', 'application/json');
            
            xhr.onload = () => this.handleResponse(xhr, true);
        
            xhr.send(`title=${this.title}&duedate=${this.duedate}&priority=${this.priority}&desc=${this.desc}&status=${this.status}`);
        
            e.preventDefault();
            return false;
          },
        handleResponse(xhr, parseResponse){
            const content = document.querySelector('#content');
            switch(xhr.status) {
              case 200: //if success
                content.innerHTML = `<b>Success</b>`;
                break;
              case 201: //if created
                content.innerHTML = '<b>Create</b>';
                break;
              case 204: //if updated
                content.innerHTML = '<b>Updated (No Content)</b>';
                break;
              case 400: //if bad request
                content.innerHTML = `<b>Bad Request</b>`;
                break;
              case 404: //if not found
                content.innerHTML = `<b>Resource Not Found</b>`;
                break;
              default: //any other status
                content.innerHTML = `Error code not implemented by client.`;
                break;
            }
            
            //if we are expecting a response body (not in a head request)
            if(parseResponse) {
              const obj = JSON.parse(xhr.response);
              content.innerHTML += `<p>${xhr.response}</p>`;
            } else { 
              //if not parsing a response, just alert that meta data was recieved
              content.innerHTML += '<p>Meta Data Recieved</p>';
            }
          },
    },
})

var app = new Vue({
    el: '#app',
    data: {},
})