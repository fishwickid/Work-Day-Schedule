// Create an array with an object referencing each hour of the working day.

var myDay = [
    {
        id: "0",
        hour: "09",
        time: "09",
        meridiem: "am",
        reminder: ""
    },
    {
        id: "1",
        hour: "10",
        time: "10",
        meridiem: "am",
        reminder: ""
    },
    {
        id: "2",
        hour: "11",
        time: "11",
        meridiem: "am",
        reminder: ""
    },
    {
        id: "3",
        hour: "12",
        time: "12",
        meridiem: "pm",
        reminder: ""
    },
    {
        id: "4",
        hour: "01",
        time: "13",
        meridiem: "pm",
        reminder: ""
    },
    {
        id: "5",
        hour: "02",
        time: "14",
        meridiem: "pm",
        reminder: ""
    },
    {
        id: "6",
        hour: "03",
        time: "15",
        meridiem: "pm",
        reminder: ""
    },
    {
        id: "7",
        hour: "04",
        time: "16",
        meridiem: "pm",
        reminder: ""
    },
    {
        id: "8",
        hour: "05",
        time: "17",
        meridiem: "pm",
        reminder: ""
    },
    
]

// Create functions required to display the current time
function getHeaderTime() {
    //moment.js API is used here to show the date and time
    var currentHeaderTime = moment().format('MMMM Do YYYY, h:mm a');
    $("#currentTime").text(currentHeaderTime);
    console.log(currentHeaderTime)
}

// saves data to localStorage
function saveReminders() {
    localStorage.setItem("myDay", JSON.stringify(myDay));
}

// sets any data in localStorage to the view
function displayReminders() {
    myDay.forEach(function (_thisHour) {
        $(`#${_thisHour.id}`).val(_thisHour.reminder);
    })
}

// sets any existing localStorage data to the view if it exists
function init() {
    var storedDay = JSON.parse(localStorage.getItem("myDay"));

    if (storedDay) {
        myDay = storedDay;
    }

    saveReminders();
    displayReminders();
}

// Execute the getHeaderTime Function

getHeaderTime();


// Use the forEach() method to individualise each time object in the myDay array 

myDay.forEach(function(thisHour) {
    // create form html elements and give thiem a class attribute of row
    var hourRow = $("<form>").attr({
        "class": "row"
    });


//Add the hour rows to the planner html class
    $(".planner").append(hourRow);


// creates a div to reference the time period sections adding the hour to each and
// a bootstrap row attribute with a width of 2/12
    var hourField = $("<div>")
        .text(`${thisHour.hour}${thisHour.meridiem}`)
        .attr({
            "class": "col-md-2 hour"
    });


// Create div that holds the text input form 
    var hourPlan = $("<div>")
        .attr({"class" : "col-md-8 p-0 "});
        
//Create a text area element and add it to the div above
    var planData = $("<textarea>");
    hourPlan.append(planData);
     planData.attr("id", thisHour.id);


// Creat if else statments determing if the hour is now, if it's past, or in the future
// add CSS attributus to them to change the background colour in CSS
    if (thisHour.time < moment().format("HH")) {
        planData.attr ({
            "class": "past", 
        })
    } else if (thisHour.time === moment().format("HH")) {
        planData.attr({
            "class": "present"
        })
    } else if (thisHour.time > moment().format("HH")) {
        planData.attr({
            "class": "future"
        })
    }

// create save button
    var saveButton = $("<i class='far fa-saveBtn fa-lg'></i>")
    var savePlan = $("<button>Save tasks</button>")
        .attr({"class": "col-md-2 p-0 saveBtn"});

// appends save button into the html
    savePlan.append(saveButton);
    hourRow.append(hourField, hourPlan, savePlan);
})

// loads any existing localstorage data after components created
init();



//Create and click event handler on the save button
//prevent default method so the page won't refresh
// saves data to be used in localStorage
$(".saveButton").on("click", function(event) {
    event.preventDefault();
    var saveIndex = $(this).siblings(".description").children(".future").attr("id");
    myDay[saveIndex].reminder = $(this).siblings(".description").children(".future").val();
    console.log(saveIndex);
    saveReminders();
    displayReminders();
})