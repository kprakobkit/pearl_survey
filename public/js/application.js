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
      //$('.container').append($("<button class='save_form_button'>Submit your survey!</button>"));
      $('.save_form_button').css('display', 'inline')
      $('.add_question').css('display', 'inline');
    });
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
        var choiceFormHtml = "<div class='container' id='choice_box'" +"data-info='" + data.question_id + "'" + "> <form action='/surveys' method='POST' id='create_choice_form'> <label> Option: <input type='text' name='option' id='option_entry'> </label> <input type='submit' value='Save'> </form></div>"
        $('.questions_container').append($(choiceFormHtml));
      $('#create_question_form').remove();
      });
    });
    //-------------------------------------------------------------//
    $('.container').on('submit','#create_choice_form', function(event){
      event.preventDefault();
      var question_id = $(this).parent().attr('data-info')
      var data = ($(this).serialize()) + "&question_id=" + question_id;
    var ajaxRequest = $.ajax({
      url: '/surveys/add_choice',
        type: 'POST',
        data: data
    }).done(function(data) {
      var question_id = data.question_id;
      var $dataInfoSelector = "[data-info='" + question_id + "']"
      $($dataInfoSelector).append($('<p>Option: ' + data.option + '</p>'));
    });
    })

    $('.delete-survey').on('submit', function(event){
      event.preventDefault();
      var surveyid = $(this).data("surveyid");
      var deleteUrl = '/surveys/' + surveyid +'/delete'
      var ajaxRequest = $.ajax({
        url: deleteUrl,
          type: 'POST',
      }).done(function(data){
        var surveyid = data.surveyid
        var $divSelector = 'div#' + surveyid
        $($divSelector).remove();
      }).fail(function(){
        console.log("failed");
      })
    });
    //---------------------------------------------------------------//
    // $('.save_form_button').on('click')
});
// ---------------------------------------------
