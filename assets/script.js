$(document).ready(function() {

    // Display the current day at the top of the calendar when a user opens the planner.
    $('#currentDay').text(dayjs().format('dddd, MMMM Do'));

// Present time blocks for standard business hours when the user scrolls down.
const container = $('.container').addClass('row').css({
    'margin-left': 'auto',
    'margin-right': 'auto',
});

// Create a spacer for better spacing.
$('<div>').css({'height': '30px'}).appendTo(container);

const businessHours = ["9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM"];

for (const hour of businessHours) {
    const timeBlockContainer = $('<div class="row"></div>').appendTo(container);
    const hourDiv = $('<div class="col-lg-1 col-sm-2 hour"></div>').text(hour).appendTo(timeBlockContainer);
    const timeBlockDiv = $('<div class="col-lg-10 col-sm-8 time-block"></div>').appendTo(timeBlockContainer);
    const saveBtn = $('<button class="col-lg-1 col-sm-2 saveBtn"><i class="fa fa-lock"></i></button>').appendTo(timeBlockContainer);
    const textAreaEl = $('<textarea class="eventInput"></textarea>').appendTo(timeBlockDiv);

    // Set initial value from local storage.
    const savedEvent = localStorage.getItem(`event-${hour}`);
    if (savedEvent) {
    textAreaEl.val(savedEvent);
    }

    hourDiv.css({
        textAlign: 'right',
        paddingTop: '15px',
        paddingRight: '5px',
    })

    textAreaEl.css({
    width: '100%',
    height: '100%',
    });

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

    // Save event to local storage on button click.
    saveBtn.on('click', function() {
    let eventText = textAreaEl.val();
    let currentHour = hourDiv.text().trim();
    localStorage.setItem(`event-${currentHour}`, eventText);
    alert('Event saved successfully!');
    });

    // Color-code each time block based on past, present, and future.
    let blockHour = parseInt(hour.replace(/[^\d]/g, ''), 10);
    const isPM = hour.includes("PM");

    if (isPM && blockHour !== 12) {
    blockHour += 12;
    }

    if (blockHour < dayjs().hour()) {
    timeBlockDiv.addClass('past');
    } else if (blockHour === dayjs().hour()) {
    timeBlockDiv.addClass('present');
    } else {
    timeBlockDiv.addClass('future');
    }
}
});