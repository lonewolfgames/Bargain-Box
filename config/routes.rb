BargainBox::Application.routes.draw do
  
  constraints(subdomain: /app(dev)?/) do
    scope module: :box do
      devise_for :users, controllers: { sessions: "box/sessions", registrations: 'box/registrations' }
      resources :carts do
        resources :items
      end
      root "home#index", as: :authenticated_root
    end
  end
  
  root "home#index"
  
end
