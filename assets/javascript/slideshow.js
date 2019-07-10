const all = [
  {
    title: "Word Guess",
    desc: "A single player hangman style guessing game with a Rick and Morty theme. Guessing the correct answer rewards the player with a clip from the show.",
    bullets: ["HTML 5", "jQuery", "CSS"],
    repo: "Word-Guess"
  },
  {
    title: "Rock-Paper-Scissors",
    desc:
      "A single-game platform for real time player vs. player challenges. The platform allows users to play against one another, view their win/loss record and site ranking, and persist their data across sessions with optional user accounts",
    bullets: ["HTML 5", "jQuery", "CSS", "firebase real-time database", "firebase authentication"],
    repo: "RPS-Game"
  },
  {
    title: "Battlestar Galactica Trivia",
    desc: "A simple timed trivia game with a few animations and random question delivery.",
    bullets: ["HTML 5", "jQuery", "CSS"],
    repo: "TriviaGame"
  },
  {
    title: "Card-Based RPG",
    desc: "A Final Fantasy VII themed single player card attack came where players must pick their hero and attack their foes.",
    bullets: ["HTML 5", "jQuery", "CSS"],
    repo: "unit-4-challenge"
  },
  {
    title: "Psychic Game",
    desc:
      "A single player game with a simple concept: guess the letter. The game is themed in an old-school text-based RPG format with some animations to set the story.",
    bullets: ["HTML 5", "jQuery", "CSS"],
    repo: "Psychic-Game"
  },
  {
    title: "TradeCraft",
    desc:
      "A simple randomization engine powers this math matching game. A player must build a trade using 4 random items, the value of wich are unknown at the start of the game. The goal is to match the target trade value without going over.",
    bullets: ["HTML 5", "jQuery", "CSS"],
    repo: "Unit-4-Game"
  },
  {
    title: "Giphy Search UI",
    desc:
      "A simple high-contrast UI powered by the Giphy API. Users can make custom search buttons during their session and perform searches with clicks. Giphy images can be favorited and users can view certain data returned by the API, such as the gif rating and an embed tag pre-populated with the image url",
    bullets: ["HTML 5", "jQuery", "CSS", "Ajax Requests", "Giphy API"],
    repo: "giphy-search"
  },
  {
    title: "Just the Tip",
    desc:
      "A simple UI form that will calculate the tip for a user-provided amount. The program displays the bill total as well as the tip amount and, if selected, the per-guest amount.",
    bullets: ["HTML 5", "jQuery", "CSS"],
    repo: "tip-calculator"
  },
  {
    title: "New York Times Search",
    desc:
      "A simple high-contrast UI powered by the NY Times API. Users can do key-word searches and the results are displayed in repeating rows. Each result returns the headline of a related article, the article abstract, the publication date, the by-line (if any), and a live link to the article on the NY Times site.",
    bullets: ["HTML 5", "jQuery", "CSS", "Ajax Requests", "NY Times API"],
    repo: "NYT-search"
  },
  {
    title: "Recipe Box",
    desc:
      "A search and save UI for recipes. Backed by the Edamam Recipe API, this site allows users to search for and save recipes to a firebase real-time database. Firebase authentication allows users to persist their data across sessions and devices.",
    bullets: ["HTML 5, CSS", "jQuery", "Ajax Requests", "Giphy API", "Edamam API", "firebase real-time database", "firebase authentication"],
    repo: "Project1"
  }
];
var currentSlide = 0;
var showInterval;
var timeout;

$(document).ready(function() {
  loadContent();
  startShow();
});

function loadContent() {
  var target = $("#slideshow");
  var left = $("<div>")
    .addClass("next")
    .addClass("left")
    .text("<");
  var right = $("<div>")
    .addClass("next")
    .addClass("right")
    .text(">");
  var info = $("<div>")
    .addClass("info")
    .attr("id", "info")
    .append("<h2>" + all[currentSlide].title + "<h2>")
    .append("<p>" + all[currentSlide].desc + "</p>");
  var dots = $("<div>").addClass("dots");
  for (var i = 0; i < all.length; i++) {
    var dot = $("<div>")
      .addClass("dot")
      .attr("data-index", i.toString())
      .css("opacity", (1 / i).toString());
    dots.append(dot);
  }
  var image = $("<img>")
    .attr("id", "slide-image")
    .attr("alt", all[currentSlide].title)
    .attr("src", "assets/images/screenshots/" + all[currentSlide].repo + ".png");
  target.append(left, right, info, dots, image);
}

$(document).on("click", ".left", function() {
  resetInterval();
  currentSlide--;
  if (currentSlide < 0) {
    currentSlide = all.length - 1;
  }
  updateSlide();
});

$(document).on("click", ".right", function() {
  resetInterval();
  currentSlide++;
  if (currentSlide === all.length) {
    currentSlide = 0;
  }
  updateSlide();
});

$(document).on("click", ".dot", function() {
  resetInterval();
  currentSlide = parseInt($(this).attr("data-index"));
  updateSlide();
});

//handle the slide changes
function updateSlide() {
  $("#slide-image")
    .attr("alt", all[currentSlide].title)
    .attr("src", "assets/images/screenshots/" + all[currentSlide].repo + ".png");
  $("#info")
    .empty()
    .append("<h2>" + all[currentSlide].title + "<h2>")
    .append("<p>" + all[currentSlide].desc + "</p>");
  //update the indicator dots
  var dots = $(".dots")
    .children()
    .toArray();
  for (var i = currentSlide; i < dots.length; i++) {
    var delta = 1 / (i - currentSlide + 1);
    if (delta < 0.3) {
      delta = 0.3;
    }
    $(dots[i]).css("opacity", delta.toString());
  }
  for (var i = currentSlide - 1; i > -1; i--) {
    var delta = 1 / (currentSlide - i + 1);
    if (delta < 0.3) {
      delta = 0.3;
    }
    $(dots[i]).css("opacity", delta.toString());
  }
}

function startShow() {
  if (timeout !== undefined) {
    clearInterval(timeout);
  }
  if (showInterval !== undefined) {
    clearInterval(showInterval);
  }
  showInterval = setInterval(function() {
    $("#slide-image").animate({ opacity: "0" }, 300, function() {
      currentSlide++;
      if (currentSlide === all.length) {
        currentSlide = 0;
      }
      updateSlide();
      $(this).animate({ opacity: "1" });
    });
    $("#info").animate({ opacity: "0" }, 300, function() {
      $(this).animate({ opacity: "1" }, 300);
    });
  }, 6000);
}

function resetInterval(ref) {
  clearInterval(showInterval);
  if (timeout !== undefined) {
    clearInterval(timeout);
  }
  timeout = setTimeout(function() {
    startShow();
  }, 10000);
}

// $(document).on("click", ".dot", function() {
//   var ref = $(this).attr("data-ref");
//   var index = $(this).attr("data-index");
//   resetInterval(ref);
//   switch (ref) {
//     case "games":
//       currentGameSlide = index;
//       break;
//     case "uis":
//       currentUiSlide = index;
//       break;
//     case "projects":
//       currentProjectSlide = index;
//       break;
//     default:
//       console.log("dfault reached in .dot");
//   }
//   displayCurrentSlide(ref);
// });

// $(document).on("click", ".show-all", function() {
//   var ref = $(this).attr("data-ref");
//   clearInterval(timeoutInterval);
//   var target;
//   var sourceArray;
//   switch (ref) {
//     case "games":
//       clearInterval(gameShowInterval);
//       target = $(".main-tile")[0];
//       sourceArray = games;
//       break;
//     case "uis":
//       clearInterval(uiShowInterval);
//       target = $(".main-tile")[1];
//       sourceArray = uis;
//       break;
//     case "projects":
//       clearInterval(projectShowInterval);
//       target = $(".main-tile")[2];
//       sourceArray = projects;
//       break;
//     default:
//       console.log("defualt reached in .show-all");
//   }
//   $(target)
//     .empty()
//     .addClass("wrap")
//     .css("background-image", "unset");
//   for (var i = 0; i < sourceArray.length; i++) {
//     var tile = $("<div>")
//       .addClass("tile")
//       .addClass("link")
//       .attr("data-link", sourceArray[i].repo)
//       .css("background-image", "url(assets/images/tiles/" + sourceArray[i].repo + ".png)");
//     $(target).append(tile);
//   }
//   $("<div>")
//     .addClass("port-link")
//     .text("return to slideshow")
//     .attr("data-ref", ref)
//     .appendTo($(target));
// });

// $(document).on("click", ".port-link", function() {
//   var ref = $(this).attr("data-ref");
//   $("#" + ref).empty();
//   loadContent(ref);
//   startShow(ref);
// });

// $(document).ready(function() {
//   var array = ["games", "uis", "projects"];
//   array.forEach(ref => {
//     loadContent(ref);
//     startShow(ref);
//   });
// });
