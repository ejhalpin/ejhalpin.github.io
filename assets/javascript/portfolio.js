//arrays to hold information about each section of the portfolio page
const games = [
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
  }
];
const uis = [
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
  }
];
const projects = [
  {
    title: "Recipe Box",
    desc:
      "A search and save UI for recipes. Backed by the Edamam Recipe API, this site allows users to search for and save recipes to a firebase real-time database. Firebase authentication allows users to persist their data across sessions and devices.",
    bullets: ["HTML 5, CSS", "jQuery", "Ajax Requests", "Giphy API", "Edamam API", "firebase real-time database", "firebase authentication"],
    repo: "Project1"
  }
];

//build tiles on the fly
function layOutTiles(ref) {
  var sourceArray;
  var sectionName;
  switch (ref) {
    case "games":
      sourceArray = games;
      sectionName = "Games";
      break;
    case "uis":
      sourceArray = uis;
      sectionName = "User Interfaces";
      break;
    case "projects":
      sourceArray = projects;
      sectionName = "Projects";
      break;
    default:
      console.log("default reached in loadContent");
  }
  var target = $("#" + ref);
  var tileBox = $("<div>")
    .addClass("tile-box")
    .attr("id", "tile-box-" + ref)
    .append("<h1>" + sectionName + "</h1>");
  //the tiles will have a side-by-side image and bulleted list of tech
  sourceArray.forEach(obj => {
    var tile = $("<div>")
      .attr("data-link", obj.repo)
      .addClass("tile")
      .addClass("link");
    var img = $("<img>")
      .attr("src", "assets/images/tiles/" + obj.repo + ".png")
      .attr("alt", obj.title)
      .addClass("tile-image");
    var listDiv = $("<div>")
      .addClass("list-aside")
      .append("<h3>" + obj.title + "</h3>");
    var list = $("<ul>");
    obj.bullets.forEach(bullet => {
      list.append("<li>" + bullet + "</li>");
    });
    listDiv.append(list);
    tile.append(img, listDiv);
    tileBox.append(tile);
  });
  target.append(tileBox);
}

$(document).ready(function() {
  layOutTiles("games");
  layOutTiles("uis");
  layOutTiles("projects");
});
