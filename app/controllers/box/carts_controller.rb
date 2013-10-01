class Box::CartsController < Box::BaseController
  respond_to :html, :json

  def index
    @carts = current_box_user.carts.all
    respond_with(@carts)
  end
  
  def show
    @cart = current_box_user.carts.find( params[:id] )
    respond_with(@cart)
  end
  
  def new
    @cart = current_box_user.carts.new
  end
  
  def create
    @cart = current_box_user.carts.new( cart_params )
  end
  
  def edit
    @cart = current_box_user.carts.find( params[:id] )
  end
  
  def update
    raise 'Implement'
  end
  
  def destroy
    @cart = current_box_user.carts.find( params[:id] )
    @cart.destroy
  end
  
  
  private

    def cart_params
      params.require(:cart).permit( :title )
    end
  
end
