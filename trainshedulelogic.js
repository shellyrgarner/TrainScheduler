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

//current time
var currTime = moment();
$("#current-time").text(currTime.format("hh:mm a"));
console.log("current time:" + currTime);

//add trains
$("#addtrain-btn").on("click", function (event) {
    event.preventDefault();

    //grabs user input
    var trainName = $("#trainname-input").val().trim();
    var trainDest = $("#destination-input").val().trim();
    // var trainTime = $("#traintime-input").val().trim();
    // console.log(trainTime);
    var trainTime = moment($("#traintime-input").val().trim(), "HH:mm").format("HH:mm");
    // console.log(trainTime);
    var trainFreq = parseInt($("#frequency-input").val().trim());





    // Creates local "temporary" object for holding train data
    var newTrain = {
        name: trainName,
        dest: trainDest,
        time: trainTime,
        freq: trainFreq,
        // nextTrain: nextTrain,
        // minsTilNextTrain: minsTilNextTrain
    };

    // Uploads train data to the database
    database.ref().push(newTrain);

    // Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.dest);
    console.log(newTrain.time);
    console.log(newTrain.freq);
    // console.log(newTrain.nextTrain);
    // console.log(newTrain.minsTilNextTrain);

    // Alert
    alert(newTrain.name + " successfully added to the schedule!");

    // Clears all of the text-boxes
    $("#trainname-input").val("");
    $("#destination-input").val("");
    $("#traintime-input").val("");
    $("#frequency-input").val("");
});

//Create Firebase event for adding trains to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function (childSnapshot, prevChildKey) {

    console.log(childSnapshot.val());

    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var trainDest = childSnapshot.val().dest;
    var trainTime = childSnapshot.val().time;
    var trainFreq = childSnapshot.val().freq;
    var nextTrain = childSnapshot.val().nextTrain;
    var minsTilNextTrain = childSnapshot.val().minsTilNextTrain;

    // Train Info
    console.log(trainName);
    console.log(trainDest);
    console.log(trainTime);
    console.log(trainFreq);
    console.log(nextTrain);
    console.log(minsTilNextTrain);

    //calculations
    var firstTrainConvert = moment(trainTime, "hh:mm").format("hh:mm a");
    console.log("firsttrainconvert:" + firstTrainConvert);

    var timeDiff = moment().diff(moment(firstTrainConvert), "minutes");
    console.log("timediff:" + timeDiff);

    //time difference between trains
    var timeRemaining = timeDiff % trainFreq;
    console.log("timeleft:" + timeRemaining);

    //minutes til next train
    var minsTilNextTrain = trainFreq - timeRemaining;
    console.log("mins til next train:" + minsTilNextTrain);

    //next train arrival
    var nextTrain = moment().add(minsTilNextTrain, "minutes").format("hh:mm a");
    console.log("next train:" + nextTrain);

    // Add each train's data into the table
    $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" +
        trainFreq + "</td><td>" + nextTrain + "</td><td>" + minsTilNextTrain + "</td><td>");
});
