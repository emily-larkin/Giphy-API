// Global Variabels

// array of strings as "topics" or topic
var animes = ["Naruto", "Naruto Shippuden", "Your Lie in April", "Dragon Ball", "Dragon Ball Z", "My Hero Academia", "Fullmetal Alchemist", "Seven Deadly Sins", "One Punch", "Attack on Titan", "Death Note", "Assasination Classroom"];
// assigns anime to the data - attribute 
var anime = $(this).attr("data-anime");
// var anime = "naruto"; this one works 
// &limit=10 limits the response by 10 
var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + anime + "&api_key=&limit=10";

function renderButtons() {
    // makes sure the buttons don't repeat themselves
    $("#buttons-view").empty();
    // put animes on the page as buttons (for loop)
    for (var i = 0; i < animes.length; i++) {
        // creates the var animeButton and makes a new button
        var animeButton = $("<button>");
        // adds class anime-button to the var 
        animeButton.addClass("btn btn-secondary");
        // adds the data attribute and sets it to anime[i]
        animeButton.attr("data-anime"); // sets 
        animeButton.attr("data-anime", animes[i]); //gets 
        // adds the text of that string as the button text
        animeButton.text(animes[i]);
        // appends the anime button to the buttons-view div
        $("#buttons-view").append(animeButton);
    }
}
renderButtons()

// Functions
$("#buttons-view").on("click", function () {
    // link the api using ajax
    $("#giphy").empty();
    $.ajax({
            url: queryURL,
            method: "GET"
        })
        .then(function (response) {
            console.log(response)
            console.log(queryURL)
            for (var i = 0; i < response.data.length; i++) {
                // show the giphy rating under each giphy 
                $("#giphy").prepend("<p>Rating of Giph: " + response.data[i].rating + "</p>");
                // when the user clicks that button, we want the corresponding giphys to come back 
                $("#giphy").prepend('<img src=" ' + response.data[i].images.fixed_height.url + '"class="gif" data-state="still" data-animate=" ' + response.data[i].images.fixed_height.url + '" data-still=" ' + response.data[i].images.fixed_height_still.url + '">');
                $("#giphy").prepend("<br>")
            }

        });
});


// all giphys should be static at first 
// create on click function to go from static to animated
$(".gif").on("click", function () {
    var state = $(this).attr("data-state");
    if (state === 'still') {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
})






// add search option (as a form) to be able to add more buttons based on the input - last step





// Main Process