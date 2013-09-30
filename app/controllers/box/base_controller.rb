class Box::BaseController < ApplicationController
  before_filter :authenticate_box_user!
  layout "box/app"

end
