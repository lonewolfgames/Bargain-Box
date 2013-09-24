BargainBox::Application.routes.draw do

  root to: "home#index"
  
  namespace :box do
    devise_for :users
    root to: "home#index"
    resources :carts do
      resources :items
    end
    
    
  end
  
end
