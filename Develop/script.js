var DateDisplayEl = $('#currentDay');
var timeBlock = $('.time-block');


$(function () {

  for (var i = 9; i <= 17; i++) {

    //set up id for each hour block
    var timeBlockId = "hour-" + i;


    // Create each time block div with styling 
    var timeBlock = $("<div>").attr("id", timeBlockId).addClass("row time-block");

    // Inserts text notating the time of each block
    var hour = $("<div>").addClass("col-2 col-md-1 hour text-center py-3").text(blockHour);

    // styliing for text area
    var textarea = $("<textarea>").addClass("col-8 col-md-10 description").attr("rows", "3");

    // add save button unique to each div
    var saveBtn = $("<button>").addClass("btn saveBtn col-2 col-md-1").attr("aria-label", "save");
    var saveIcon = $("<i>").addClass("fas fa-save").attr("aria-hidden", "true");

    // Convert to am/pm 
    var blockHour = i < 12 ? i + "AM" : i - 12 + "PM";

    //append in layers to the main container
    saveBtn.append(saveIcon);
    timeBlock.append(hour, textarea, saveBtn);
    $(".container-fluid").append(timeBlock);
  };
});

//change color based on hour differences
$(function () {

  //find current hour
  var currentHour = dayjs().format("H");

  //repeat for each time-block
  $(".time-block").each(function () {
    var textarea = $(this).find(".description");

    //grab id # from #-hour
    var blockHour = parseInt($(this).attr("id").split("-")[1]);

    // Compare id hour vs current hour and add class according to result
    if (blockHour < currentHour) {
      $(this).addClass("past");
    } else if (blockHour === currentHour) {
      $(this).addClass("present");
    } else if (blockHour > currentHour) {
      $(this).addClass("future");
    }

  });
});


//pull any previously saved data from local storage on startup
$(function () {
  $(".time-block").each(function () {
    var timeBlockId = $(this).attr("id");
    var userInput = localStorage.getItem(timeBlockId);
    $(this).find(".description").val(userInput);
  });
});




// Added a Listner for the save button that uses time-block id as a key to save user input in local storage. 
$(function () {
  $(".saveBtn").on("click", function () {
    var timeBlockId = $(this).parent().attr("id");
    var userInput = $(this).siblings(".description").val();
    localStorage.setItem(timeBlockId, userInput);
  });
});


//Finds current day with dayjs and displays it on top of the scheduler
$(function () {
  var today = dayjs().format('[It is] h:ma on MMM DD, YYYY');
  DateDisplayEl.text(today);
});
