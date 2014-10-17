$(document).ready(function() {
  // Save survey title
  $('.add_question').css('display', 'none');
  $('#create_survey_form').on('submit', function(event){
  event.preventDefault();
  $(this).css('display', 'none');
  var ajaxRequest = $.ajax({
    url: '/surveys',
    type: 'POST',
    data: $(this).serialize()
  }).done(function(data){
    title = data.title;
    var questionFormHtml = "<div class='question_box'> <form action='/surveys/add_question' method='POST' id='create_question_form'> <label> Question: <input type='text' name='description'> </label> <input type='submit' value='Save'> </form> <div class='choice_container'> </div> </div>";
    $('.container').prepend($(questionFormHtml));
    $('.container').prepend($('<h1>Title: ' + data.title + '</h1>'));
    $('.add_question').css('display', 'inline');
  });

//-------------------------------------------------------------//
  $('.add_question').on('click', function(event){
    var questionFormHtml = "<div class='question_box'> <form action='/surveys/add_question' method='POST' id='create_question_form'> <label> Question: <input type='text' name='description'> </label> <input type='submit' value='Save'> </form> <div class='choice_container'> </div> </div>";
    $('.questions_container').append($(questionFormHtml));
  });

//-------------------------------------------------------------//
  $('.container').on('submit','#create_question_form', function(event){
    event.preventDefault();
    var data = $(this).serialize();
    var ajaxRequest = $.ajax({
      url: '/surveys/add_question',
      type: 'POST',
      data: data
    }).done(function(data) {
      $('.questions_container').append($('<h3>Question: ' + data.description + '</h3>'));
      $('#create_question_form').remove();
    });
  });

});
});
