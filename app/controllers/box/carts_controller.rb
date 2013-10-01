class Box::CartsController < Box::BaseController
  respond_to :html, :json

  def index
    @carts = current_user.carts.all
    respond_with(@carts)
  end
  
  def show
    @cart = current_user.carts.find( params[:id] )
    respond_with(@cart)
  end
  
  def new
    @cart = current_user.carts.new
    respond_with(@cart)
  end
  
  def create
    @cart = current_user.carts.new( cart_params )
    if @cart.save
      redirect_to carts_path
    else
      render action: :new
    end
  end
  
  def edit
    @cart = current_user.carts.find( params[:id] )
  end
  
  def update
    @cart = current_user.carts.find( params[:id] )
    if @cart.update_attributes( cart_params )
      redirect_to box_carts_path
    else
      render action: :edit
    end
  end
  
  def destroy
    @cart = current_user.carts.find( params[:id] )
    @cart.destroy
    redirect_to carts_path
  end
  
  
  private

    def cart_params
      params.require(:cart).permit( :title )
    end
  
end
