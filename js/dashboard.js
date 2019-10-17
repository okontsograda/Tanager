// Declaring global variables for the form submission
const form      = document.getElementById('input-form');
const button    = document.querySelector('add-card');
/* Global variable for wher the cards will be displayed on the dashboard
    TODO: add functionality for displayed in the working and completed columns
*/
let cardContainer;
let cardContainerWorking;
let cardContainerCompleted;

let cardsArray = localStorage.getItem('cards') ?
JSON.parse(localStorage.getItem('cards')) : [];

// Global variables for the input data values
const title         =   document.getElementById('title');
const description   =   document.getElementById('description');   
const assigned      =   document.getElementById('assigned');
const date          =   new Date().toLocaleDateString();

const data = JSON.parse(localStorage.getItem('cards'));


// Process the input form when it is submitted
document.getElementById('input-form').addEventListener('submit', function(e) {
    // TODO: Add form validation for the input fields being passed in

    // Assign the values parsed from the input form and push them to the array in a key-value pair
    var task = {
        "title"         :   title.value,
        "description"   :   description.value,
        "date"          :   date,
        "assigned"      :   assigned.value
    };
    
    createTaskCard(task);

    cardsArray.push(task);
    localStorage.setItem('cards', JSON.stringify(cardsArray));
    
    e.preventDefault();

    // Reset values of the input forms after processing the submission
    title.value = '';
    description.value = '';
    assigned.value = '';
    
});

document.getElementById('clear-data').addEventListener("click", function (e) {
    e.preventDefault();    
    localStorage.clear();

    $("#init-card-container").empty();

})

// Function to create a new task card
let createTaskCard = (task) => {
    // Create the initial div for the card
    let card = document.createElement('div')
    card.className = 'card';

    let cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    let title = document.createElement('h5');
    title.innerText =   task.title;
    title.className =   'card-title';

    let cardText = document.createElement('p');
    cardText.innerText   =   task.description;
    cardText.className   =   'card-text';

    let cardDate = document.createElement('div');
    cardDate.innerText  =   task.date;
    cardDate.className  =   'posted-date';

    let assignedTo          =   document.createElement('div');
    assignedTo.innerText    =   task.assigned;
    assignedTo.className    =   'assigned-field';


    cardBody.appendChild(title);
    cardBody.appendChild(cardText);
    cardBody.appendChild(cardDate);
    cardBody.appendChild(assignedTo);
    card.appendChild(cardBody);
    cardContainer.appendChild(card);
}

// Function used to check the current cards and load them to be displayed on the page
let initListOfCards = () => {
    if (cardContainer) {
        document.getElementById('init-card-container').replaceWith(cardContainer);
        return;
    }
    
    cardContainer = document.getElementById('init-card-container');
    
    // Loop through the tasks currently found in storage and create a task card
    if (data) {
        data.forEach((task) => {
            createTaskCard(task);
        });
    }
};

// Load the cards onto the page
initListOfCards();