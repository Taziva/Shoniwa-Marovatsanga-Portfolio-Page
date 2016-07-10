var sections = $('section'),
  nav = $('.nav'),
  nav_height = nav.outerHeight();

$(window).on('scroll', function() {
  var cur_pos = $(this).scrollTop();

  sections.each(function() {
    var top = $(this).offset().top - nav_height,
      bottom = top + $(this).outerHeight();

    if (cur_pos >= top && cur_pos <= bottom) {
      nav.find('a').removeClass('active');
      sections.removeClass('active');

      $(this).addClass('active');
      nav.find('a[href="#' + $(this).attr('id') + '"]').addClass('active');
    }
  });
});

nav.find('a').on('click', function() {
  var $el = $(this),
    id = $el.attr('href');

  $('html, body').animate({
    scrollTop: $(id).offset().top - nav_height
  }, 500);

  return false;
});
var attributedQuotes = [{
    author: "Isaac Asimov",
    quote: "People who think they know everything are a great annoyance to those of us who do."
  }, {
    author: "Mark Twain",
    quote: "Get your facts first, then you can distort them as you please."
  }, {
    author: "Elbert Hubbard",
    quote: "Do not take life too seriously. You will never get out of it alive."
  }, {
    author: "Douglas Adams",
    quote: "I love deadlines. I like the whooshing sound they make as they fly by."
  }, {
    author: "James Thurber",
    quote: "Why do you have to be a nonconformist like everybody else?"
  }, {
    author: "Tallulah Bankhead",
    quote: "If I had to live my life again, I'd make the same mistakes, only sooner."
  }, {
    author: "Andre Maurois",
    quote: "We owe to the Middle Ages the two worst inventions of humanity, romantic love and gunpowder."
  }, {
    author: "Charles M. Schulz",
    quote: "I love mankind, it's people I can't stand."
  }, {
    author: "Josh Billings",
    quote: "Every man has his follies - and often they are the most interesting thing he has got."
  }, {
    author: "Voltaire",
    quote: "The superfluous, a very necessary thing."
  }, {
    author: "Mo Udall",
    quote: "Lord, give us the wisdom to utter words that are gentle and tender, for tomorrow we may have to eat them."
  }, {
    author: "Nick Vujicic",
    quote: "The pinnacle of the fulfillment I can ever experience for my spirit and soul is to hear from the Lord, when I see Him face to face, 'Well done my good and faithful servant'."
  }, {
    author: "Don Marquis",
    quote: "A pessimist is a person who has had to listen to too many optimists."
  }, {
    author: "Douglas Adams",
    quote: "I'm spending a year dead for tax reasons."
  }, {
    author: "Jane Wagner",
    quote: "All my life, I always wanted to be somebody. Now I see that I should have been more specific."
  }, {
    author: "William Feather",
    quote: "If you're naturally kind, you attract a lot of people you don't like"
  }, {
    author: "Charles M. Schulz",
    quote: "I have a new philosophy. I'm only going to dread one day at a time."
  }, {
    author: "Laurence J. Peter",
    quote: "Originality is the fine art of remembering what you hear but forgetting where you heard it."
  },
  /*{author:"", quote:""},
  {author:"", quote:""}*/
];
var newQuoteText;
var newQuoteAuthor;
var randomNumber;
var quotesLength;

function getQuote() {
  var quoteArea = $("#quoteArea");
  var quoteAuthor = $("#quoteAuthor");
  quotesLength = attributedQuotes.length;
  randomNumber = Math.floor(Math.random() * (quotesLength));
  for (var i = 0; i < quotesLength; i++) {
    newQuoteText = attributedQuotes[randomNumber].quote;
    newQuoteAuthor = attributedQuotes[randomNumber].author;
    $("#quoteContainer").fadeOut(500,
      function() {
        $("#quoteArea").html(newQuoteText),
          $("#quoteAuthor").html(newQuoteAuthor)
      });
    $("#quoteContainer").fadeIn(500);
    break;
  };
};
$(document).ready(function() {
  getQuote();
  $("#anotherOne").on("click", function() {
    getQuote();
  });

  $("#shareTweet").on("click", function() {
    window.open('https://twitter.com/intent/tweet?text=' + '"' + newQuoteText + '"' + ' By ' + newQuoteAuthor);
  });
});

function updateClock() {
  var currentTime = new Date();
  var currentHours = currentTime.getHours();
  var currentMinutes = currentTime.getMinutes();
  var currentSeconds = currentTime.getSeconds();

  // Pad the minutes and seconds with leading zeros, if required
  currentMinutes = (currentMinutes < 10 ? "0" : "") + currentMinutes;
  currentSeconds = (currentSeconds < 10 ? "0" : "") + currentSeconds;

  // Choose either "AM" or "PM" as appropriate
  timeOfDay = (currentHours < 12) ? "AM" : "PM";

  // Convert the hours component to 12-hour format if needed
  currentHours = (currentHours > 12) ? currentHours - 12 : currentHours;

  // Convert an hours component of "0" to "12"
  currentHours = (currentHours == 0) ? 12 : currentHours;

  // Compose the string for display
  var currentTimeString = currentHours + ":" + currentMinutes + " " + timeOfDay;

  $("#clock").html(currentTimeString);

}

$(document).ready(function() {
  var timeOfDay;
  setInterval('updateClock()', 1000);
});

$(document).ready(function() {
  var longitude;
  var latitude;
  var city;
  var country;
  var celsius;
  var fahrenheit;
  var url;
  if (navigator.geolocation) {
    console.log("Yes");
  } else console.log("No");
  navigator.geolocation.getCurrentPosition(function(position) {

    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    url = "https://api.wunderground.com/api/26b5f75cab6feca2/conditions/q/" + latitude + "," + longitude + ".json";
    $.ajax({
      url: url,
      dataType: "jsonp",
      async: false,
      contentType: "application/json",
      success: function(data) {
        console.log(data.current_observation.temp_c);
        celsius = data.current_observation.temp_c.toFixed(0);
        $("#temp").html(celsius);
        fahrenheit = data.current_observation.temp_f;
        $("#currentCity").html(data.current_observation.display_location.full);
        $("#weatherReadings").html(data.current_observation.weather);
        $("#weatherIcon img").attr("src", "http://icons.wxug.com/i/c/v4/" + data.current_observation.icon + ".svg");
        console.log($("#weatherIcon img").attr("src"));

      }
    })
  });
  $('#tempUnitChange').click(function() {
    if ($("#temp").hasClass('celsius')) {
      $("#temp").html(fahrenheit.toFixed(0));
      $("#tempUnitChange").html("&degF");
      $("#temp").removeClass('celsius');
      $("#temp").addClass('fahrenheit')
    } else if ($("#temp").hasClass('fahrenheit')) {
      $("#temp").html(celsius);
      $("#tempUnitChange").html("&degC");
      $("#temp").removeClass('fahrenheit');
      $("#temp").addClass('celsius');
    }
  })
});
$(document).ready(function() {

  $("#wikiSearchButton").click(function() {

    var searchInput = $("#wikiSearchBar").val();
    var wikiURL = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + searchInput + "&limit=10&namespace=0&format=json&callback=?"
    $.ajax({
      type: "GET",
      url: wikiURL,
      async: false,
      dataType: "json",
      success: function(data) {
        $("#searchResult-title").html("Search Results for: " + data[0]);
        $("#searchResults").html("")
        for (var i = 0; i < data[1].length; i++) {
          $("#searchResults").append("<li><a href=" + data[3][i] + " target='_blank'>" + data[1][i] + "</a> </br> <p>" + data[2][i] + "</p></li>")
        };
        $("#wikiSearchBar").val("");
      },
      error: function(err) {
        alert("Error");
      }
    })
  });
  $("#wikiSearchBar").keypress(function(e) {
    if (e.which == 13) {
      e.preventDefault();
      $("#wikiSearchButton").click();
    }
  })
});