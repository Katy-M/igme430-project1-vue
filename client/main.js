// Heading component that displays the name of the application and the create card button
Vue.component('vueheading', {
    props: ['title'],
    template: `
    <div class="row justify content center">
        <h1 class="col-lg-6 col-md-6">{{ title }}</h1>
        <button class="col-lg-6 col-md-6" id="createButton">Create New Card</button>
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
    props: ['title','desc'],
    template: `
    <div class="card container-fluid" id="todo">
        <h3>{{ title }}</h3>
        <ul>
            <li class="due">Due Date</li>
            <li class="priority">
                Priority Level
                <select>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>
            </li>
            <li class="desc">
                <p>{{ desc }}</p>
            </li>
            <li class="status">
            To-do, in progress, or complete
            <select>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </li>
        </ul>
        <button>Update Card</button>
    </div>
    `,
});

var app = new Vue({
    el: '#app',
    data: {},
})