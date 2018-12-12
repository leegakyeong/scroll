Rails.application.routes.draw do
  namespace :api do
    resources :papers do
      resources :memos
    end
    resources :users
    get 'user' => 'users#user' # get current user
  end
  scope :api do # https://github.com/nsarno/knock/issues/120
    post 'user_token' => 'api/user_token#create'
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
