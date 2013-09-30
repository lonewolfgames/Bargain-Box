class Box::BaseController < ApplicationController
  before_filter :authenticate_user!
  layout "box/app"

  def after_sign_in_path_for(user)
    raise "wat"
  end
end
