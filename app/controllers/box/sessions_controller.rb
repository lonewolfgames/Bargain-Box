class Box::SessionsController < Devise::SessionsController
  skip_before_filter  :verify_authenticity_token
  layout false
end