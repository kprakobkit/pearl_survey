get '/' do
  redirect '/surveys'
end

get '/surveys' do
  @surveys = Survey.all

  erb :index
end

get '/surveys/create' do
  erb :survey_create
end

post '/surveys' do
  content_type :json
  survey = Survey.create(title: params[:title])
  {title: survey.title}.to_json
end

post '/surveys/add_question' do
  content_type :json
  survey = Survey.last
  survey.questions << Question.create(description: params[:description])
  question = survey.questions.last
  {description: question.description, question_id: question.id}.to_json
end

post '/surveys/add_choice' do
  content_type :json
  question = Question.find(params[:question_id])
  question.choices << Choice.create(option: params[:option])
  relation = question.choices
  choice = relation.last
  {option: choice.option, question_id: question.id}.to_json
end

get '/take_survey/:id' do
  p @survey = Survey.find(params[:id])
  @questions = Question.where(survey_id: @survey.id)
  erb :take_survey
end

post '/choice/:id' do
 @answer = Response.create(choice_id: params[:id])
end
