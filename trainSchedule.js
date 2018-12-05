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
  
    var trainName = $("#train-name").val().trim();
    var trainDest = $("#train-destination").val().trim();
    var trainTime = moment($("#train-time").val().trim(),"HH:mm").subtract(10,"years").format("X");
    var trainFreq = $("#train-frequency").val().trim();
  
    var newTrain = {
      name: trainName,
      dest: trainDest,
      time: trainTime,
      rate: trainFreq
    };
  
    database.ref().push(newTrain);
  
    $("#train-name").val("");
    $("#train-destination").val("");
    $("#train-time").val("");
    $("#train-frequency").val("");
  });
  
  database.ref().on("child_added", function(snapshot) {

    var trainName = snapshot.val().name;
    var trainDest = snapshot.val().dest;
    var trainTime = snapshot.val().time;
    var trainFreq = snapshot.val().rate;
  
    var remainder = moment().diff(moment.unix(trainTime),"minutes")%trainFreq;
    var minutes = trainFreq - remainder;
    var arrival = moment().add(minutes,"m").format("hh:mm A");

    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(trainDest),
      $("<td>").text(trainFreq),
      $("<td>").text(arrival),
      $("<td>").text(minutes)
    );
  
    $("#train-Schedule > tbody").append(newRow);
  });