var config = {
    apiKey: "AIzaSyDu1b75mmELasq_7RbKfAkz3-ReEpBKbDw",
    authDomain: "trainschedule-5f8f5.firebaseapp.com",
    databaseURL: "https://trainschedule-5f8f5.firebaseio.com",
    projectId: "trainschedule-5f8f5",
    storageBucket: "trainschedule-5f8f5.appspot.com",
    messagingSenderId: "355519844019"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

$("#submit").on("click", function(event) {
    event.preventDefault();
  
    var trainName = $("#trainName").val().trim();
    var trainDest = $("#trainDestination").val().trim();
    var trainTime = $("#trainTime").val().trim();
    var trainFreq = $("#trainFrequency").val().trim();
  
    var newTrain = {
      name: trainName,
      dest: trainDest,
      time: trainTime,
      rate: trainFreq
    };
  
    database.ref().push(newTrain);
  
    $("#trainName").val("");
    $("#trainDestination").val("");
    $("#trainTime").val("");
    $("#trainFrequency").val("");
  });
  
  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());

    var trainName = childSnapshot.val().name;
    var trainDest = childSnapshot.val().dest;
    var trainTime = childSnapshot.val().time;
    var trainFreq = childSnapshot.val().rate;
  
    var trainArrival = moment()
    console.log(trainArrival)
    
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(trainDest),
      $("<td>").text(trainTime),
      $("<td>").text(trainFreq),
    );
  
    $("#trainSchedule > tbody").append(newRow);
  });