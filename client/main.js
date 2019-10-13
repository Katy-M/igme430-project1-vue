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
    props: ['title', 'todoCards'],
    template: `
    <div class="col-lg-4 col-md-4 column">
        <h2>{{ title }}</h2>
        <vuecard
            v-for='card in todoCards'
            v-bind:key='card.title'
            v-bind:title='card.title'
            v-bind:desc='card.desc'
            v-bind:duedate='card.duedate'
            v-bind:priority='card.priority'
        ></vuecard>
        <vuecard
          title="Example"
          desc="Description of Task"
          duedate="2019-08-08"
          priority=3
        ></vuecard>
    </div>
    `,
});

Vue.component('vuecard', {
    props: ['title','desc', 'duedate', 'priority'],
    template: `
    <div class="card container-fluid" id="todo">
        <h3>{{ title }}</h3>
        <ul>
            <li class="due">
              Due Date: {{ duedate }}
            </li>
            <li class="priority">
                Priority Level: {{ priority }}
            </li>
            <li class="desc">
                <p>{{ desc }}</p>
            </li>
        </ul>
    </div>
    `,
});

Vue.component('createform', {
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
        handleResponse(xhr){
            const content = document.querySelector('#content');
            switch(xhr.status) {
              case 201: //if created, put vue card components under the correct components
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
              case 500: //server error
                content.innerHTML = `<b>Internal Server Error</b>`;
                break;
              default: //any other status
                content.innerHTML = `Error code not implemented by client.`;
                break;
            }
              content.innerHTML += `<p>${xhr.response}</p>`;
              //if not parsing a response, just alert that meta data was recieved
              content.innerHTML += '<p>Meta Data Recieved</p>';
          },
    },
})

var app = new Vue({
    el: '#app',
    data: {
      // get all of these cards from the server that the user creates
      todoCards: [],
      inprogressCards: [],
      completedCards: [],
    },
    template: 
    `
    <div>
    <vueheading title="Plotting Productivity"></vueheading>
    <hr></hr>
    <div class="row justify-content-center">
      <vuecolumn title="To-Do" :todoCards="this.todoCards" ></vuecolumn>
      <vuecolumn title="In Progress"></vuecolumn>
      <vuecolumn title="Completed"></vuecolumn>
    </div>
    <div class="container-fluid">
        <createform></createform>
    </div>
    </div>
    `,
})