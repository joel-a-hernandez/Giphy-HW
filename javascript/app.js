var sportsArray = ['basketball', 'soccer', 'football', 'volleyball']

        function displayGifs(){
            $("#view-gifs").empty();
            var sport = $(this).attr("data-name");
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + sport + "&api_key=D9PBamVDJrGFTbcyQnYO74HeQQsQDOjm&limit=10";

            $.ajax({
            url: queryURL,
            method: "GET",
            }).then(function(response) {
                console.log(response.data);
                var results = response.data;

                

                for (var i = 0 ; i < results.length; i++){
                    var gifDiv = $("<div>");

                    var rating = results[i].rating;
                    var p = $("<p>").text("Rating: " + rating);

                    var sportImage = $("<img>");
                    sportImage.attr("src", results[i].images.fixed_height.url);

                    gifDiv.prepend(sportImage);
                    gifDiv.prepend(p);
                    
                    var sportGif = $("#view-gifs");

                    sportGif.prepend(gifDiv);

                   
                }
            });

        }
       
   

        function renderButtons() {

            // Deleting the buttons prior to adding new movies
            // (this is necessary otherwise you will have repeat buttons)
            $("#button-container").empty();

            // Looping through the array of movies
            for (var i = 0; i < sportsArray.length; i++) {

            // Then dynamically generating buttons for each movie in the array
            // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
            var a = $("<button>");
            // Adding a class of movie to our button
            a.addClass("gif");
            // Adding a data-attribute
            a.attr("data-name", sportsArray[i]);
            // Providing the initial button text
            a.text(sportsArray[i]);
            // Adding the button to the buttons-view div
            $("#button-container").append(a);
            }
        }

            $("#add-gif").on("click", function(event) {
            event.preventDefault();

            // This line grabs the input from the textbox
            var sport = $("#gif-input").val().trim();

            // Adding the movie from the textbox to our array
            sportsArray.push(sport);
            console.log(sportsArray);

            // Calling renderButtons which handles the processing of our movie array
            renderButtons();
            });

        $(document).on("click", ".gif", displayGifs);

        renderButtons();