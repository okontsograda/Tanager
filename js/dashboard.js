// Declaring global variables for the form submission
const form      = document.getElementById('input-form');
const button    = document.querySelector('add-card');

// Global variable for where the cards will be displayed on the dashboard
let cardContainer;

// Parse localStorage and retrieve all items labeled cards and convert to JSON format
let cardsArray = localStorage.getItem('cards') ? JSON.parse(localStorage.getItem('cards')) : [];
// let cardsArray = Object.entries(localStorage);


// Global variables for the input data values
const title         =   document.getElementById('title');
const description   =   document.getElementById('description');   
const date          =   new Date().toLocaleDateString();

const data = JSON.parse(localStorage.getItem('cards'));

// Process the input form when it is submitted
form.addEventListener('submit', function(e) {
    // TODO: Add form validation for the input fields being passed in

    // Assign the values parsed from the input form and push them to the array in a key-value pair
    var task = {
        "title"         :   title.value,
        "description"   :   description.value,
        "date"          :   date,
    };
    
    createTaskCard(task);

    cardsArray.push(task);
    localStorage.setItem('cards', JSON.stringify(cardsArray));
    
    e.preventDefault();

    // Reset values of the input forms after processing the submission
    title.value = '';
    description.value = '';
    
});

$(document).on('click', ':button.btn-done', function(e) {
    var btnID = $(this).attr('id');
    removeTaskCard(btnID);
    e.preventDefault();
});

document.getElementById('clear-data').addEventListener("click", function (e) {
    e.preventDefault();    
    localStorage.clear();

    $("#init-card-container").empty();

});

// Create a new task card
let createTaskCard = (task) => {
    // Create the initial div for the card
    let card = document.createElement('div')
    card.className  = 'card';
    card.id         = task.title;

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

    let doneButton          = document.createElement('button');
    doneButton.innerText    = 'Done';
    doneButton.className    = 'btn btn-sm btn-done';
    doneButton.id           = task.title;

    cardBody.appendChild(title);
    cardBody.appendChild(cardText);
    cardBody.appendChild(cardDate);
    cardBody.appendChild(doneButton);
    card.appendChild(cardBody);
    cardContainer.appendChild(card);
}

//  Remove a task card
let removeTaskCard = (task) => {
    var currentCards = JSON.parse(localStorage.getItem('cards'));
    var index = findIndex(currentCards, 'title', task);
    currentCards.splice(index,1);
    localStorage.clear();
    localStorage.setItem('cards', JSON.stringify(currentCards));
    $('#' + task).remove();
}

let findIndex = (array, attr, value) => {
    for(var i = 0; i < array.length; i++) {
        if(array[i][attr] === value) {
            return i;
        }
    }
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