class Box::BaseController < ApplicationController
  before_action :authenticate_user!
  before_action :find_base_data

  prepend_before_action :check_for_auth_token
  layout "box/app"
  scoped_views = false

   private

    def check_for_auth_token
      token = request.headers["X-AUTH-TOKEN"]
      return unless token
      user = User.where(auth_token: token).first
      sign_in user if user
    end

    def find_base_data
      @carts = current_user.carts.all
    end

end
