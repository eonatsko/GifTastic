var still;
var animated;
var topics = ["Cupcakes", "Chocolate", "Cookies", "Cakes", "Ice Cream", "Lollipops", "Candy", "Brownies", "Pie"];

function displayButtons() {
  $("#button-display").empty();
  for (var i = 0; i < topics.length; i++) {
    var dessertButton = $("<button>");
    dessertButton.text(topics[i]);
    dessertButton.addClass("desserts")
    $("#button-display").append(dessertButton);
    dessertButton.attr("data-name", topics[i]);

  }
}
$(document).ready(function () {
  // Render original dessert 
  displayButtons();
  // On submitting new dessert from the form text field,
  // new dessert is pushed into the dessert array
  $("#newDessert").on("click", function (event) {
    event.preventDefault();
    // $("#userDessert").addClass('button')
    var dessert = $("#userDessert").val().trim();
    // $("button").attr("data-name", dessert);
    topics.push(dessert);
    displayButtons();
  });
});

$(document).on('click', '.desserts', function (event) {
  event.preventDefault();
  var addedDessert = $(this).attr("data-name");
  console.log(addedDessert);
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    addedDessert + "&api_key=luF9clRXB8l9jli6ugpMDeKhcZeC9nBn&limit=10";
  $.ajax({
    url: queryURL,
    method: "GET"
  })
    .then(function (response) {
      // storing the data from the AJAX request in the results variable
      var results = response.data;
      $("#showGifs").empty();
      // Looping through each result item
      for (var i = 0; i < results.length; i++) {
        // Creating and storing a div tag
        var newImage = $("<div>");
        // Creating and storing an image tag
        var dessertImage = $("<img>");
        var p = $("<p>").text("Rating: " + results[i].rating);
        // Setting the attributes of the image to a property pulled off the result item
        dessertImage.attr("src", results[i].images.fixed_height_still.url);
        dessertImage.attr("data-still", results[i].images.fixed_height_still.url);
        dessertImage.attr("data-animate", results[i].images.fixed_height.url);
        dessertImage.attr("data-state", still);

        // Appending the paragraph and image tag to the newImage
        newImage.append(dessertImage);
        newImage.append(p);
        // Appending the images to the html container
        $("#showGifs").append(newImage);



        dessertImage.on("click", function () {
          var state = $(this).attr("data-state");
          // If the clicked image's state is still, update its src attribute to what its data-animate value is.
          // Then, set the image's data-state to animate
          // Else set src to the data-still value
          if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
          } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
          }
        });

      }
    });
});

