$(document).ready(function() {
	$('select').material_select();
	$(".button-collapse").sideNav();
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
  console.log(email);
  $.ajax({
    url: 'user/' + email,
    method: 'PUT',
    success: function() {
      $("#js-update-choices").removeClass("red").addClass("green");
    },
    error: function(a,b) {
      console.log(a);
      console.log(b);
    }
  });
});

