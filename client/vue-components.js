// Heading component that displays the name of the application and the create card button
Vue.component('vHeading', {
    props: ['title'],
    template: `
    <div class="row justify content center">
        <h1 class="col-lg-6 col-md-6">{{ props.title }}</h1>
        <button class="col-lg-6 col-md-6" id="createButton">Create New Card</button>
    </div>
    `,
})