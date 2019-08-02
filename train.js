var config = {
    apiKey: "AIzaSyDedQFlls4qDksusBECwQyJ03yZ60A-wJ0",
    authDomain: "myawesomepractice1.firebaseapp.com",
    databaseURL: "https://myawesomepractice1.firebaseio.com",
    projectId: "myawesomepractice1",
    storageBucket: "",
    messagingSenderId: "734002951346",
    appId: "1:734002951346:web:0bc8f3e4519dd565"
  };
  
  firebase.initializeApp(config);
  
  var database = firebase.database();
  
  $("#add-trainname-btn").on("click", function(event) {
    event.preventDefault();
  
    var trainName = $("#train-name-input")
      .val()
      .trim();
    var destination = $("#destination-input")
      .val()
      .trim();
    var firstTrainTime = moment(
      $("#traintime-input")
        .val()
        .trim(),
      "MM/DD/YYYY"
    ).format("X");
    var minutes = $("#minutes-input")
      .val()
      .trim();
  
    var newTrain = {
      name: trainName,
      destination: place,
      traintime: time,
      minutes: minutes
    };
  
    database.ref().push(newTrain);
  
    console.log(newTrain.name);
    console.log(newdestination.place);
    console.log(newtime.time);
    console.log(newminutes.minutes);
  
    alert("Train arriving");
  
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#traintime-input").val("");
    $("#minutes-input").val("");
  });
  
  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    var trainName = childSnapshot.val().name;
    var traindestination = childSnapshot.val().place;
    var traintime = childSnapshot.val().time;
    var trainminutes = childSnapshot.val().minutes;
  
    console.log(trainName);
    console.log(traindestination);
    console.log(traintime);
    console.log(trainminutes);
  
    var trainTimeofArivial = moment.unix(convertedDate.format("MMM Do, YYYY hh:mm:ss"));
  
    var trainTime = moment().diff(moment(trainTime, "X"), "minutes");
    console.log(trainTimeofArivial);
  
    var minutesTillArival = trainTimeofArivial / trainminutes;
    console.log(minutesTillArival);
  
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(traindestination),
      $("<td>").text(trainTimeofArivial),
      $("<td>").text(minutesTillArival),
    );
  
    $("#train-table > tbody").append(newRow);
  });