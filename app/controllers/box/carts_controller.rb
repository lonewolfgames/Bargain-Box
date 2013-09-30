class Box::CartsController < Box::BaseController
  
  def index
    @carts = Cart.all
    render :json => @carts
  end
  
  def show
    @cart = Cart.find( params[:id] )
    render :json => @cart
  end
  
  def new
    @cart = Cart.new
    render :json => @cart
  end
  
  def create
    @cart = Cart.new( params.require(:cart).permit( :title ) )
    
    if @cart.save
      render :json => @cart
    end
  end
  
  def edit
    @cart = Cart.find( params[:id] )
    render :json => @cart
  end
  
  def update
    @cart = Cart.find( params[:id] )
    
    if @cart.update_attributes( params.require(:item).permit( :title ) )
      render :json => @cart
    end
  end
  
  def destroy
    @cart = Cart.find( params[:id] )
    @cart.destroy
  end
  
  
  private
  
  def cart_params
    params.require(:cart).permit( :title )
  end
  
end