class Box::BaseController < ApplicationController
  before_filter :authenticate_user!
  
  
  
  private
  
    def after_sign_out_path_for(resource)
      root_path
    end
  
end