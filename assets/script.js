$(document).ready(function() {

// Display the current day at the top of the calender when a user opens the planner.

let currentDay = document.getElementById('currentDay');

currentDay.textContent = dayjs().format('dddd, MMMM Do');


// Present timeblocks for standard business hours when the user scrolls down.

let container = $('.container');

container.addClass('row');

container.css({
    'margin-left': 'auto',
    'margin-right': 'auto',
});

const businessHours = ["9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM"];

for (const hour of businessHours) {

    let timeBlockContainer = $('<div class="row"></div>');
    let hourDiv = $('<div class="col-1 hour"></div>');
    let timeBlockDiv = $('<div class="col-10 time-block"></div>');
    let saveBtn = $('<button class = "col-1 saveBtn"></button>')

    hourDiv.text(hour);
    
    timeBlockContainer.append(hourDiv);
    timeBlockContainer.append(timeBlockDiv);
    timeBlockContainer.append(saveBtn);

    container.append(timeBlockContainer);
}

// Color-code each timeblock based on past, present, and future when the timeblock is viewed.

const currentHour = dayjs().hour(); // Get the current hour

console.log(currentHour);



// Allow a user to enter an event when they click a timeblock

// Save the event in local storage when the save button is clicked in that timeblock.

// Persist events between refreshes of a page

});