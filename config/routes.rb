Rails.application.routes.draw do

  root 'application#index'

  namespace :api, defaults: {format: 'json'} do 
    namespace :v1 do 
      resources :posts, except: [:new, :edit]
      resources :beats, except: [:new, :edit]
      resources :invitations, except: [:new, :edit, :update, :show, :index]
      devise_for :users, :controllers => { :sessions => "api/v1/sessions", :registrations => "api/v1/registrations", :passwords => "api/v1/passwords"}
      resources :users, only: [:show, :index, :update]
    end
  end

  get '*path' => 'application#index'
end