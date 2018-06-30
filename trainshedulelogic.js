  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAbaOSKSDkWLjaku376ddXabdsmDr7Eyls",
    authDomain: "train-schedule-3e742.firebaseapp.com",
    databaseURL: "https://train-schedule-3e742.firebaseio.com",
    projectId: "train-schedule-3e742",
    storageBucket: "",
    messagingSenderId: "459320070195"
  };

  firebase.initializeApp(config);
  
  var database = firebase.database();
  
  // 2. Button for adding trains
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var trainName = $("#trainname-input").val().trim();
    var trainDest = $("#destination-input").val().trim();
    var trainTime = $("#traintime-input").val().trim();
    var trainFreq = $("#frequency-input").val().trim();
  
    // Creates local "temporary" object for holding train data
    var newTrain = {
      name: trainName,
      dest: trainDest,
      time: trainTime,
      freq: trainFreq
    };
  
    // Uploads train data to the database
    database.ref().push(newTrain);
  
    // Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.dest);
    console.log(newTrain.time);
    console.log(newTrain.freq);
  
    // Alert
    alert("Train successfully added");
  
    // Clears all of the text-boxes
    $("#trainname-input").val("");
    $("#destination-input").val("");
    $("#traintime-input").val("");
    $("#frequency-input").val("");
  });
  
  // 3. Create Firebase event for adding trains to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot, prevChildKey) {
  
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var trainDest = childSnapshot.val().dest;
    var trainTime = childSnapshot.val().time;
    var trainFreq = childSnapshot.val().freq;
  
    // Train Info
    console.log(trainName);
    console.log(trainDest);
    console.log(trainTime);
    console.log(trainFreq);
  
    // Prettify the employee start
    // var empStartPretty = moment.unix(empStart).format("MM/DD/YY");
  
    // Calculate the months worked using hardcore math
    // To calculate the months worked
    // var empMonths = moment().diff(moment(empStart, "X"), "months");
    // console.log(empMonths);
  
    // Calculate the total billed rate
    // var empBilled = empMonths * empRate;
    // console.log(empBilled);
  
    // Add each train's data into the table
    $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" +
    trainTime + "</td><td>" + trainFreq + " mins" + "</td><td>");
  });
  
  // Example Time Math
  // -----------------------------------------------------------------------------
  // Assume Employee start date of January 1, 2015
  // Assume current date is March 1, 2016
  
  // We know that this is 15 months.
  // Now we will create code in moment.js to confirm that any attempt we use meets this test case
  