// Create an array of strings called topics:
var musicTopics = ["metallica", "britney spears", "aerosmith", "the beatles", "pink floyd", "the rollin stones", "justin timberlake", "nirvana", "ac/dc", "foo fighters", "radiohead", "pearl jam", "imagine dragons", "twenty one pilots", "coldplay", "drake", "ed sheeran", "bruno mars", "katy perry"];
var gifCount = 0;
// Take the topics in the array and create buttons in your HTML:
function addButtons() {

    $(".buttons-div").empty();
    for (var i = 0; i < musicTopics.length; i++) {
        var button = $("<button>");
        button.addClass("musician btn btn-outline-light");
        button.attr("data-name", musicTopics[i]);
        button.text(musicTopics[i]);
        $(".buttons-div").append(button);
    }
}
addButtons();
makeAjaxCall();

//Take the value from user input box and adds it into the topics array:
$("#submit-button").on("click", function (event) {
    event.preventDefault();
    var music = $("#gif-input").val().trim().toLowerCase();
    musicTopics.push(music);
    //Then call the function that takes each topic in the array remakes the buttons on the page:
    addButtons();
    makeAjaxCall();
});

//On a button click grab 10 static gifs from GIPHY API:
function makeAjaxCall() {
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

                //Store the data from the AJAX request:
                var resultsArray = response.data;
                $(".gif-div").empty();
                //Append the response to the screen:
                for (var i = 0; i < resultsArray.length; i++) {

                    gifCount++;

                    var musicDiv = $("<figure>");
                    musicDiv.addClass("figure");
                    musicDiv.attr("id", "number-" + gifCount);


                    var rating = $("<figcaption>").text("Rating: " + resultsArray[i].rating);
                    rating.addClass("figure-caption text-right");

                    var musicImage = $("<img>");
                    musicImage.addClass("figure-img img-fluid rounded");
                    musicImage.attr("src", resultsArray[i].images.fixed_width_still.url);
                    musicImage.attr("data-still", resultsArray[i].images.fixed_width_still.url);
                    musicImage.attr("data-animate", resultsArray[i].images.fixed_width.url);
                    musicImage.attr("data-state", "still");
                    musicImage.attr("id", "imgnumber-" + gifCount);
                    musicImage.addClass("gif");

                    console.log(musicImage.attr("id"), musicImage.attr("src"));
                    console.log("Still img source: ", musicImage.attr("data-still"));
                    console.log("Original img source: ", musicImage.attr("data-animate"));

                    var favButton = $("<input>").val("Add to favorites!");
                    favButton.addClass("btn btn-outline-danger fav-button");
                    favButton.attr("data-button-number", gifCount);

                    musicDiv.append(rating);
                    musicDiv.append(musicImage);
                    musicDiv.append(favButton);

                    $(".gif-div").append(musicDiv);
                };
            });
    });
};

//On the click event stop and start the animation of the gif:
$(document).on("click", ".gif", function () {
    var state = $(this).attr("data-state");
    console.log("State: ", state);
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    };
});
//On "click" event add the gif to favorites and remove it from the list:
$(document).on("click", ".fav-button", function () {
    var buttonNumber = $(this).attr("data-button-number");
    $("#favorites").prepend($("#imgnumber-" + buttonNumber));
    $("#number-" + buttonNumber).remove();
});