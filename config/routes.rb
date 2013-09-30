BargainBox::Application.routes.draw do
  
  namespace :box, scope: :box do
    devise_for :users, controllers: { sessions: "box/sessions" }
    resources :carts do
      resources :items
    end
  end
  
  
  root "home#index"
  
end
