$(document).ready(function() {
  $('#create_survey_form').on('submit', function(event){
  event.preventDefault();
  console.log($(this).serialize());
  $(this).css('display', 'none');
  var ajaxRequest = $.ajax({
    url: '/surveys',
    type: 'POST',
    data: $(this).serialize()
  }).done(function(data){
    title = data.title;
    $('.container').prepend($('<h1>Title: ' + data.title + '</h1>'));
  });
})
});
