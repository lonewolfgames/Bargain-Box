class Box::CartsController < Box::BaseController
  respond_to :html, :json

  # GET /carts
  def index
    @carts = current_user.carts.order('updated_at DESC').load
    respond_with(@carts)
  end
  
  # GET /carts/:id
  def show
    @cart = current_user.carts.find( params[:id] )
    respond_with(@cart)
  end
  
  # GET /carts/new
  def new
    @cart = current_user.carts.new
    @cart.items.build
    respond_with @cart
  end
  
  # POST /carts
  def create
    @cart = current_user.carts.new( cart_params )
    if @cart.save
      respond_to do |format|
        format.html { redirect_to carts_path }
        format.json { render :json => @cart }
      end
    else
      respond_to do |format|
        format.html { render action: :new }
        format.json { render json: @cart }
      end
    end
  end
  
  def edit
    @cart = current_user.carts.find( params[:id] )
  end
  
  def update
    @cart = current_user.carts.find( params[:id] )
    if @cart.update_attributes( cart_params )
      redirect_to carts_path
    else
      render action: :edit
    end
  end
  
  def destroy
    @cart = current_user.carts.find( params[:id] )
    
    if @cart.destroy
      respond_to do |format|
        format.html { redirect_to carts_path }
        format.json { render :json => @cart }
      end
    else
      respond_to do |format|
        format.html { render action: :new }
        format.json { render json: @cart }
      end
    end
  end
  
  
  private

    def cart_params
      params.require(:cart).permit( :title, items_attributes: [:id, :title, :url, :host] )
    end
end
