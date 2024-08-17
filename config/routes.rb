Rails.application.routes.draw do
  root to: "home#index"

  get "/" => "home#index"
  post "/" => "home#post"
  get 'login', to: 'sessions#new'
  post 'login', to: 'sessions#create'
  delete 'logout', to: 'sessions#destroy'

  get "kw" => 'kw#index'
  get "supporter/:id" => "supporter#get"
  post "supporter/:id" => "supporter#post"
  delete "supporter/:id" => "supporter#delete"
  post "advertisements" => "advertisements#post"
end
