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
    let eventInput = $('<input type="text" >');

    hourDiv.text(hour);
    
    timeBlockContainer.append(hourDiv);
    timeBlockContainer.append(timeBlockDiv);
    
    timeBlockContainer.append(saveBtn);
    timeBlockDiv.append(eventInput); 
    container.append(timeBlockContainer);

    eventInput.css({
        'width': '100%',
        'height': '100%',
        'border': 'none',
        'background': 'transparent', 
        'box-sizing': 'border-box'
    });
}


// Color-code each timeblock based on past, present, and future when the timeblock is viewed.

const currentHour = dayjs().hour(); 

$('.time-block').each(function() {

    let blockHour = parseInt($(this).siblings('.hour').text().replace(/[^0-9]/g, ''), 10);

    const isPM = $(this).siblings('.hour').text().includes("PM");

    if (blockHour === 12 && !isPM) {
        blockHour = 0; 

    } else if (isPM && blockHour !== 12) {
        blockHour += 12; 

    }

    if (blockHour < currentHour) {
        $(this).addClass('past');

    } else if (blockHour === currentHour) {
        $(this).addClass('present');

    } else {
        $(this).addClass('future');

    }
});

// Allow a user to enter an event when they click a timeblock

// Save the event in local storage when the save button is clicked in that timeblock.

// Persist events between refreshes of a page

});