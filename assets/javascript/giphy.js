$(document).ready(function () {
    // Global Variabels

    // array of strings as "topics" or topic
    var animesArray = ["Naruto", "Naruto Shippuden", "Your Lie in April", "Dragon Ball", "Dragon Ball Z", "My Hero Academia", "Fullmetal Alchemist", "Seven Deadly Sins", "One Punch", "Attack on Titan", "Death Note", "Assassination Classroom"];

    // Functions
    function renderButtons() {
        // makes sure the buttons don't repeat themselves
        $("#buttons-view").empty();
        // put animes on the page as buttons (for loop)
        for (var i = 0; i < animesArray.length; i++) {
            // creates the var animeButton and makes a new button
            // appends the anime button to the buttons-view div
            // adds the data attribute and sets it to anime[i]
            $("#buttons-view").append("<button class='btn btn-secondary' data-anime='" + animesArray[i] + "'>" + animesArray[i] + "</button>");
        }
    }
    renderButtons()

    $(".btn-secondary").on("click", function () {
        // assigns anime to the data - attribute 
        var animeURL = $(this).attr("data-anime"); // sets
        console.log(animeURL);
        // &limit=10 limits the response by 10 
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animeURL + "&api_key=hK4UiyRDocGCchliJGOj7WBo7pLHz9Y9&limit=10";
        
        // link the api using ajax
        $.ajax({
                url: queryURL,
                method: "GET"
            })
            .then(function (response) {
                var results = response.data;
                $("#giphy").empty();
                console.log(queryURL)
                for (var i = 0; i < results.length; i++) {
                    // show the giphy rating under each giphy 
                    $("#giphy").prepend("<p>Rating of Giph: " + results[i].rating + "</p>");
                    // when the user clicks that button, we want the corresponding giphys to come back 
                    $("#giphy").prepend('<img src=" ' + results[i].images.fixed_height.url + '"class="gif" data-state="animate" data-animate="' + results[i].images.fixed_height.url + '" data-still="' + results[i].images.fixed_height_still.url + '">');
                    $("#giphy").prepend("<br>")
                }
            });
    });

    // all giphys should be static at first 
    // create on click function to go from static to animated
    function changeState() {
        var state = $(this).attr("data-state");
        var animateState = $(this).attr("data-animate");
        var animateStill = $(this).attr("data-still");
        if (state === 'still') {
            $(this).attr("src", animateState);
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", animateStill);
            $(this).attr("data-state", "still");
        }
    }

    // add search option (as a form) to be able to add more buttons based on the input - last step
    $("#submit-button").on("click", function () {
        event.preventDefault();
        var newAnime = $("#formGroupExampleInput").val();
        animesArray.push(newAnime);
        renderButtons();
    });

    // Main Process

    // calls the function whenever the gif class is clicked on... wasn't working as an on click function
    $(document).on("click", ".gif", changeState)

});