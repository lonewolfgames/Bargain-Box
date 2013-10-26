BargainBox::Application.routes.draw do
  
  constraints(subdomain: /app(dev)?/) do
    scope module: :box do
      devise_for :users, controllers: { sessions: "box/sessions", registrations: 'box/registrations' }
      resources :carts do
        resources :items
      end
      authenticated :user do
        root :to => "home#index", :as => "authenticated_root"
      end
    end
  end


  require 'sidekiq/web'
  mount Sidekiq::Web => '/sidekiq'
  
  root to: "home#index"
  get "/about", to: "home#about"
  get "/contact", to: "home#contact"
end
