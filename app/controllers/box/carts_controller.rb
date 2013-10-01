class Box::CartsController < Box::BaseController

  def index
    @carts = current_box_user.carts.all
    render :json => @carts
  end
  
  def show
    @cart = current_box_user.carts.find( params[:id] )
    render :json => @cart
  end
  
  def new
    @cart = current_box_user.carts.new
    render :json => @cart
  end
  
  def create
    @cart = current_box_user.carts.new( cart_params )
    
    if @cart.save
      render :json => @cart
    end
  end
  
  def edit
    @cart = current_box_user.carts.find( params[:id] )
    render :json => @cart
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
