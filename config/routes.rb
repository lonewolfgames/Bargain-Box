BargainBox::Application.routes.draw do
  
  namespace :box, scope: :box do
    devise_for :users, controllers: { sessions: "box/sessions", registrations: 'box/registrations' }
    resources :carts do
      resources :items
    end
    root "home#index", as: :authenticated_root
  end
  
  root "home#index"
  
end
