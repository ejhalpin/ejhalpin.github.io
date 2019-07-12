$(document).on("click", ".link", function() {
  var link = $(this).attr("data-link");
  if (link.includes("www")) {
    window.open(link, "_blank");
  } else if (link.includes(".html")) {
    window.location.href = link;
  } else {
    var url = "https://ejhalpin.github.io/" + link + "/";
    window.open(url, "_blank");
  }
});
