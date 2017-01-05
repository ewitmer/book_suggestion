// Maeterialize initialization functions
$(document).ready(function() {
	$('select').material_select();
	$(".button-collapse").sideNav();
  $('.parallax').parallax();
  $('.carousel').carousel();
  $('.collapsible').collapsible();
	Materialize.updateTextFields();
});
  	
// Deletes a specific users record from the database
$( "#js-delete-user" ).on( "click", function(e) {
  email =  $( this )["0"].name;
  $.ajax({
    url: 'user/' + email,
    method: 'DELETE',
    success: function() {
      window.location.href = "bye.html";
    }
  });
});

// Updates a specific users preferences in the database
$( "#js-update-choices" ).on( "click", function(e) {
  e.preventDefault();
  email =  $( this )["0"].name;
  $.ajax({
    url: 'user/' + email,
    method: 'PUT',
    success: function() {
      $("#js-update-choices").removeClass("red").addClass("green");
      $("#js-updated").text("Your selections have been saved!");
    },
    error: function(err) {
      console.log(err);
    }
  });
});
 
// Pulls Google Books API data from the front end to populate thumbnail images and book links
$(document).ready(function(){
  $( ".request" ).each(function( index, element ) {
    var googleUrl = "https://www.googleapis.com/books/v1/volumes?q=isbn:" + element.id;
    
    $.ajax({
     url: googleUrl
    }).done(function(data) {
      
      //create new elements
      var newImage = document.createElement('img');
      var newLink = document.createElement('a');
      var newInfo = document.createElement('p')
      
      // validate Google Books API data
      var author = data.items[0].volumeInfo.authors[0] ? data.items[0].volumeInfo.authors[0] : "Author not available";
      var title = data.items[0].volumeInfo.title ? data.items[0].volumeInfo.title : "Title not available";
      newLink.href = data.items[0].volumeInfo.infoLink ? data.items[0].volumeInfo.infoLink : "";
      newImage.src = data.items[0].volumeInfo.imageLinks.thumbnail ? data.items[0].volumeInfo.imageLinks.thumbnail : "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2000px-No_image_available.svg.png"
      newLink.target = "_blank"
      newImage.className = "thumbnail"

      //append new elements to DOM
      newInfo.append(`${title} by ${author}`)
      element.append(newLink)
      newLink.append(newImage)
      element.append(newInfo)
    });
  });
});

