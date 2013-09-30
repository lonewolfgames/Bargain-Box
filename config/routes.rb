BargainBox::Application.routes.draw do
  
  scope module: "box" do
    devise_for :users, controllers: { sessions: "box/sessions" }
    resources :carts do
      resources :items
    end
    root to: "home#index", as: :box_authenticated_root
  end
  
  unauthenticated do
    root to: "home#index", as: :unathenticated_root
  end
  
end