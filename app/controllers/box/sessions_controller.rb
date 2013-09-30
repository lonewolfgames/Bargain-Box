class Box::SessionsController < Devise::SessionsController
  
  def create
    response.headers['X-CSRF-Token'] = form_authenticity_token
  end
  
end