class Box::ItemsController < Box::BaseController
  respond_to :html, :json
  before_action :find_data

  def index
    @items = @cart.items.all
    respond_with(@items)
  end

  def new
    @item = @cart.items.new
    respond_with(@item)
  end

  def create
    @item = @cart.items.create( item_params )

    if @item.save
      redirect_to cart_items_path(@cart)
    else
      render action: :new
    end
  end

  def show
    @item = @cart.items.find(params[:id])
    respond_with(@item)
  end

  def edit
    @item = @cart.items.find(params[:id])
    respond_with(@item)
  end

  def update
    @item = @cart.items.find(params[:id])

    if @item.update_attributes( item_params )
      redirect_to cart_items_path(@cart)
    else
      render action: :edit
    end
  end

  def destroy
    @item = @cart.items.find(params[:id])
    @item.destroy
    redirect_to cart_items_path(@cart)
  end


  private
    def item_params
      params.require(:item).permit(:title, :host, :url)
    end

    def find_data
      @cart = current_user.carts.find(params[:cart_id]) if params[:cart_id]
    end
  
end
