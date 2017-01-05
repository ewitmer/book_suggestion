$(document).ready(function() {
	$('select').material_select();
	$(".button-collapse").sideNav();
  $('.parallax').parallax();
  $('.carousel').carousel();
  $('.collapsible').collapsible();
	Materialize.updateTextFields();
});
  	

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

$( "#js-update-choices" ).on( "click", function(e) {
  e.preventDefault();
  email =  $( this )["0"].name;
  $.ajax({
    url: 'user/' + email,
    method: 'PUT',
    success: function() {
      $("#js-update-choices").removeClass("red").addClass("green");
    },
    error: function(err) {
      console.log(err);
    }
  });
});

$(document).ready(function(){
$.ajax({ url: "database/update.html",
        success: function(){
           alert("done");
        }});
});

$(document).ready(function(){
$( ".request" ).each(function( index, element ) {
  var googleUrl = "https://www.googleapis.com/books/v1/volumes?q=isbn:" + element.id;
  
  $.ajax({
   url: googleUrl
  }).done(function(data) {
  
    var newImage = document.createElement('img');
    var newLink = document.createElement('a');
    newLink.href = data.items[0].volumeInfo.infoLink
    newLink.target = "_blank"
    newImage.className = "thumbnail"
    newImage.src = data.items[0].volumeInfo.imageLinks.thumbnail
    var newInfo = document.createElement('p')
    var author = data.items[0].volumeInfo.authors[0];
    var title = data.items[0].volumeInfo.title;
    newInfo.append(title + " by " + author)
    element.append(newLink)
    newLink.append(newImage)
    element.append(newInfo)
  });
});
});

