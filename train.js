var firebaseConfig = {
  apiKey: "AIzaSyBlSMyn3N13XsTdpQGN6cV82bMYAkU48_8",
  authDomain: "tashatrainhomework.firebaseapp.com",
  databaseURL: "https://tashatrainhomework.firebaseio.com",
  projectId: "tashatrainhomework",
  storageBucket: "",
  messagingSenderId: "1020801042725",
  appId: "1:1020801042725:web:26ed0d020c532e77"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
  
  var database = firebase.database();
  
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    var trainName = $("#train-input")
      .val()
      .trim();
    var place = $("#destination-input")
      .val()
      .trim();
    var time = 
      $("#start-input")
        .val()
        .trim();
      
    var frequency = $("#min-input")
      .val()
      .trim();
  
    var newTrain = {
      name: trainName,
      destination: place,
      firstTrainTime: time,
      frequency: frequency
    };
  
    database.ref().push(newTrain);
  
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.firstTrainTime);
    console.log(newTrain.frequency);
  
    alert("Train arriving");
  
    $("#train-input").val("");
    $("#destination-input").val("");
    $("#start-input").val("");
    $("#min-input").val("");
  });
  
  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    var name = childSnapshot.val().name;
    var destination = childSnapshot.val().destination;
    var firstTrainTime = childSnapshot.val().firstTrainTime;
    var frequency = childSnapshot.val().frequency;
  
    console.log(name);
    console.log(destination);
    console.log(firstTrainTime);
    console.log(frequency);

    var timeArr = firstTrainTime.split(":")
    var trainTime = moment().hours(timeArr[0]).min(timeArr[1]);
    var maxMoment = moment.max(moment(), trainTime);
    var tMinutes;
    var tArrival;

    if(maxMoment === trainTime) {
      tArrival = trainTime.format("hh:mm A");
      tMinutes = trainTime.diff(moment(), "minutes");
    }else {
      var differenceTimes = moment().diff(trainTime, "minutes");
      var tRemainder = differenceTimes % frequency;
      tMinutes = frequency - tRemainder; 

      tArrival = moment().add(tMinutes, "m").format("hh:mm A");
    }
  
   console.log("tminutes:", tMinutes);
   console.log("tArrival:", tArrival);

    var newRow = $("<tr>").append(
      $("<td>").text(name),
      $("<td>").text(destination),
      $("<td>").text(frequency),
      $("<td>").text(tArrival),
      $("<td>").text(tMinutes),
    );
  
    $("#train-table > tbody").append(newRow);
  });