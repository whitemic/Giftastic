var topics = ["Joey Tribbiani", "Rachel Green", "Monica Geller", "Phoebe Buffay", "Chandler Bing", "Ross Geller", "Eric Forman", "Steven Hyde", "Michael Kelso", "Jackie Burkhart", "Donna Pinciotti", "Fez", "Kitty Forman", "Red Forman", "Jesse Katsopolis", "Stephanie Tanner", "Danny Tanner", "Joey Gladstone", "Michelle Tanner" ];

var searchTerm = "";


$("#add-character").on("click", function(event) {
    event.preventDefault();
    var character = $("#char-input").val().trim();
    console.log(character);
    topics.push(character);
    renderButtons();
  });

function displayGifs() {
    console.log("Hi");
    searchTerm = $(this).attr("data-person");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      searchTerm + "&api_key=prAwOsEm3QDqZPomrbAhInjTsLi8J1SX";

    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function(response) {
        var results = response.data;

        for (var i = 0; i < 10; i++) {
          var gifDiv = $("<div class='item'>");

          var rating = results[i].rating;

          var p = $("<p>").text("Rating: " + rating);

          var personImage = $("<img id='image'>");
          personImage.attr("data-state", "still");
          personImage.attr("data-still", results[i].images.fixed_height_still.url);
          personImage.attr("data-animate", results[i].images.fixed_height.url);
          personImage.attr("src", results[i].images.fixed_height_still.url);


          gifDiv.prepend(p);
          gifDiv.prepend(personImage);

          $("#gifs").prepend(gifDiv);
        }
      });  
}

    function changeState() {
        var state = $(this).attr("data-state");
        console.log(state)
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
        
    }
  

  function renderButtons() {
    $("#buttons-div").empty();
    for (var i = 0; i < topics.length; i++) {
      var newButton = $("<button>");
      newButton.addClass("character");
      newButton.attr("data-person", topics[i]);
      newButton.text(topics[i]);
      $("#buttons-div").append(newButton);
    }
}
renderButtons();
$(document).on("click", ".character", displayGifs);
$(document).on("click", "#image", changeState);
