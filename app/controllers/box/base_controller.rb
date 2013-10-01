class Box::BaseController < ApplicationController
  before_filter :authenticate_box_user!
  prepend_before_filter :check_for_auth_token
  layout "box/app"

   private
    def check_for_auth_token
      token = request.headers["X-AUTH-TOKEN"]
      return unless token
      user = User.where(auth_token: token).first
      sign_in user if user
    end

end
