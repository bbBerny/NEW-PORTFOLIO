console.log("Running the script");

const form = document.querySelector('form');
const scheduleTable = [];

form.addEventListener('submit', (event) => {
  event.preventDefault();

  // Add the new schedule entry to the schedule table.
  addScheduleEntryFromForm(form, scheduleTable);

  // Clear the form.
  form.reset();
});


function addScheduleEntryFromForm(form, scheduleTable) {
    // Create a new object to store the schedule entry.
    const newEntry = {};
  
    // Get the values from the form fields.
    const date = form.querySelector('#date').value;
    const startTime = form.querySelector('#time_start').value;
    const endTime = form.querySelector('#time_end').value;
    const activity = form.querySelector('#activity').value;
    const place = form.querySelector('#place').value;
    const type = form.querySelector('#type').value;
    const notes = form.querySelector('#notes').value;
    const flag = form.querySelector('#flag').value;
    const isFreeBusy = form.querySelector('#free_busy').checked;
  
    // Add the values to the new schedule entry object.
    newEntry.date = date;
    newEntry.startTime = startTime;
    newEntry.endTime = endTime;
    newEntry.activity = activity;
    newEntry.place = place;
    newEntry.type = type;
    newEntry.notes = notes;
    newEntry.flag = flag;
    newEntry.isFreeBusy = isFreeBusy;
  
    // Add the new schedule entry to the schedule table.
    scheduleTable.push(newEntry);
  }

  