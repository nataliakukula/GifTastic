// Create an array of strings called topics:
var musicTopics = ["metallica", "britney spears", "aerosmith", "the beatles", "pink floyd", "the rollin stones", "justin timberlake", "nirvana", "ac/dc", "foo fighters", "radiohead", "pearl jam", "imagine dragons", "twenty one pilots", "coldplay", "drake", "ed sheeran", "bruno mars", "katy perry"];

// Take the topics in the array and create buttons in your HTML:
function addButtons() {

    $(".buttons-div").empty();
    for (var i = 0; i < musicTopics.length; i++) {
        var button = $("<button>");
        button.addClass("musician");
        button.attr("data-name", musicTopics[i]);
        button.text(musicTopics[i]);
        $(".buttons-div").append(button);
    }
}

addButtons();

//On a button click grab 10 static gifs from GIPHY API:
$(".musician").on("click", function () {
    var musicName = $(this).attr("data-name");

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        musicName + "&api_key=Zm8q9Qo27bvYE4mrLRmSA0verKDGSj0a&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {

            console.log(response);
            console.log(response.data[0].images.original_still.url);
            console.log(response.data[0].images.original.url);
            console.log(response.data[0].rating);

            //Store the data from the AJAX request:
            var resultsArray = response.data;
            $(".gif-div").empty();
            //Append the response to the screen:
            for (var i = 0; i < resultsArray.length; i++) {

                var musicDiv = $("<div>");
                var rating = $("<p>").text("Rating: " + resultsArray[i].rating);
                var musicImage = $("<img>");

                musicImage.attr("src", resultsArray[i].images.original_still.url);
                musicImage.attr("data-still", resultsArray[i].images.original_still.url);
                musicImage.attr("data-animate", resultsArray[i].images.original.url);
                musicImage.attr("data-state", "still");
                musicImage.addClass("gif");

                musicDiv.append(rating);
                musicDiv.append(musicImage);

                $(".gif-div").prepend(musicDiv);

                //On the click event stop and start the animation of the gif:
                $(".gif").on("click", function () {
                    var state = $(this).attr("data-state");

                    if (state === "still") {
                        $(this).attr("src", $(this).attr("data-animate"));
                        $(this).attr("data-state", "animate");
                    } else {
                        $(this).attr("src", $(this).attr("data-still"));
                        $(this).attr("data-state", "still");
                    };
                });
            };

        });
});

//Take the value from user input box and adds it into the topics array:
$("#submit-button").on("click", function (event) {
    event.preventDefault();
    var music = $("#gif-input").val().trim().toLowerCase();
    musicTopics.push(music);
    //Then call the function that takes each topic in the array remakes the buttons on the page:
    addButtons();
});
