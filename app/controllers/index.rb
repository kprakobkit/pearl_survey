# get main page '/surveys'
# post '/surveys'
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
  p params
  content_type :json
  survey = Survey.last
  survey.questions << Question.create(description: params[:description])
  question = survey.questions.last
  {description: question.description}.to_json
end


