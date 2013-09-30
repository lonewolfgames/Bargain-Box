class Box::BaseController < ApplicationController
  before_filter :authenticate_user!
  layout "box/app"

  def after_sign_in_path_for(user)
    redirect_to box_root
  end
end
