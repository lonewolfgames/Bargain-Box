class Box::BaseController < ApplicationController
  before_filter :authenticate_user!
  layout "box/app"
end