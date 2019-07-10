var firebaseConfig = {
  apiKey: "AIzaSyB58CnxXpOIU7UBvQZeqULDsLpNhuxoM1A",
  authDomain: "contacts-a028e.firebaseapp.com",
  databaseURL: "https://contacts-a028e.firebaseio.com",
  projectId: "contacts-a028e",
  storageBucket: "",
  messagingSenderId: "598386776550",
  appId: "1:598386776550:web:7b7068c5203dded4"
};
//Initialize firebase and set a database reference
firebase.initializeApp(firebaseConfig);
var database = firebase.database();

$("#contact").on("click", function() {
  $("#contact-modal")
    .detach()
    .appendTo(".container");
});

$(document).on("click", "#cancel", function() {
  $("#name").val("");
  $("#email").val("");
  $("#phone").val("");
  $("#message").val("");
  $(".modal")
    .detach()
    .appendTo($("#hidden"));
});

$(document).on("click", "#submit", function(event) {
  event.preventDefault();
  var name = $("#name")
    .val()
    .trim();
  var email = $("#email")
    .val()
    .trim();
  var phone = $("#phone")
    .val()
    .trim();
  if (phone.length === 0) {
    phone = "none";
  }
  var message = $("#message")
    .val()
    .trim();
  //empty the values of the contact form
  resetContactForm();
  //hide the contact form
  $("#contact-modal")
    .detach()
    .appendTo("#hidden");
  //display the submit modal with a spinning gif
  $("#submit-modal-loading")
    .detach()
    .appendTo($(".container"));
  //send the data collected above to firebase
  database
    .ref("/messages")
    .push({
      name,
      email,
      phone,
      message,
      isRead: false
    })
    .then(function() {
      //show the submission successful message
      $("#submit-modal-loading")
        .detach()
        .appendTo($("#hidden"));
      $("#submit-modal-success")
        .detach()
        .appendTo($(".container"));
    })
    .catch(function(err) {
      console.log(err);
      //display an error modal...
    });
});

$(document).on("click", "#close", function() {
  $("#submit-modal-success")
    .detach()
    .appendTo($("#hidden"));
});

function resetContactForm() {
  $("#name").val("");
  $("#email").val("");
  $("#phone").val("");
  $("#message").val("");
}

//TODO - validate the form
// $("form").on("change", function() {
//   //check for validation
//   var name = $("#name")
//     .val()
//     .trim();
//   var email = $("#email")
//     .val()
//     .trim();
//   var phone = $("#phone")
//     .val()
//     .trim();
//   var message = $("#message")
//     .val()
//     .trim();

//   if (name.length === 0) return;
//   if (!email.includes("@") || !email.includes(".") || email.length < 3) return;
//   if (message.length === 0) return;

//   $("#submit").prop("disabled", false);
// });
