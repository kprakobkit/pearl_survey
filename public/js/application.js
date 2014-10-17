$(document).ready(function() {
  // Save survey title
  $('.add_question').css('display', 'none');
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
    var questionFormHtml = "<div class='question_box'><form action='/surveys/add_question' method='POST' id='create_question_form'> <label> Question: <input type='text' name='description'> </label> <input type='submit' value='Save'> </form></div>";
    $('.container').prepend($(questionFormHtml));
    $('.container').prepend($('<h1>Title: ' + data.title + '</h1>'));
    $('.add_question').css('display', 'inline');
  });

//-------------------------------------------------------------//
  $('.add_question').on('click', function(event){
    var questionFormHtml = "<div class='question_box'><form action='/surveys/add_question' method='POST' id='create_question_form'> <label> Question: <input type='text' name='description'> </label> <input type='submit' value='Save'> </form></div>";
    $('.questions_container').append($(questionFormHtml));
  });

});
});
