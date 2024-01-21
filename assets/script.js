//To make sure the code runs successfully:
$(document).ready(function() {

//Displays the current day at the top of the calendar when a user opens the planner:
$('#currentDay').text(dayjs().format('dddd, MMMM Do'));

//Making main container centered on the page:
const container = $('.container').addClass('row').css({
    'margin-left': 'auto',
    'margin-right': 'auto',
});

//Creating a spacer between the black line and the time schedule:
$('<div>').css({'height': '30px'}).appendTo(container);

//Array with all the hours of the working day:
const businessHours = ["9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM"];

//For/of loop to successfully add timeblock lines in a bootstrap grid system to make up the full time schedule covering business hours:
for (const hour of businessHours) {
    // Adding the relevant HTML elements with the appropriate classes:
    const timeBlockContainer = $('<div class="row"></div>').appendTo(container);
    const hourDiv = $('<div class="col-lg-1 col-sm-2 hour"></div>').text(hour).appendTo(timeBlockContainer);
    const timeBlockDiv = $('<div class="col-lg-10 col-sm-8 time-block"></div>').appendTo(timeBlockContainer);
    const saveBtn = $('<button class="col-lg-1 col-sm-2 saveBtn"><i class="fa fa-lock"></i></button>').appendTo(timeBlockContainer);
    const textAreaEl = $('<textarea class="eventInput"></textarea>').appendTo(timeBlockDiv);

    //Retrieving information from local storage:
    const savedEvent = localStorage.getItem(`event-${hour}`);
    
    if (savedEvent) {
        textAreaEl.val(savedEvent);
    }

    //Adjusting the style of the left and middle columns:
    hourDiv.css({
        textAlign: 'right',
        paddingTop: '15px',
        paddingRight: '5px',
    })

    textAreaEl.css({
        width: '100%',
        height: '100%',
    });

    //Replicating mock-up styles - what happens when text area is in focus and when icon is hovered over:
    textAreaEl.focus(function() {
        $(this).css({
        outline: 'none',
        border: '3px solid #06aed5'
        });
    });

    textAreaEl.blur(function() {
        $(this).css('border', '');
    });

    saveBtn.hover(
    function () { $(this).find('i').css('color', 'black'); },
    function () { $(this).find('i').css('color', 'white'); }
    );

    //Adding 'click' event to save the added input to local storage, displaying an alert when it has been saved:
    saveBtn.on('click', function() {
        let eventText = textAreaEl.val();
        let currentHour = hourDiv.text().trim();
        localStorage.setItem(`event-${currentHour}`, eventText);
        alert('Event saved successfully!');
    });

    //Colour-coding each timeblock based on past, present, and future (including conversion of time range to only go up to 12 and to consider whether event is AM or PM):
    let blockHour = parseInt(hour.replace(/[^\d]/g, ''), 10);
    const isPM = hour.includes("PM");

    if (isPM && blockHour !== 12) {
        blockHour += 12;
    }

    //Colour grey is applied to past hours, colour red is applied to current hour and colour green is applied to future hours:
    if (blockHour < dayjs().hour()) {
        timeBlockDiv.addClass('past');
    } else if (blockHour === dayjs().hour()) {
        timeBlockDiv.addClass('present');
    } else {
        timeBlockDiv.addClass('future');
    }
}
});