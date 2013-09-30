class Box::ItemsController < Box::BaseController
  
  def index
    @items = Item.all
    render :json => @items
  end
  
  def show
    @item = Item.find( params[:id] )
    render :json => @item
  end
  
  def new
    @item = Item.new
    render :json => @item
  end
  
  def create
    @item = Item.new( params.require(:item).permit( :title, :host, :url ) )
    
    if @item.save
      render :json => @item
    end
  end
  
  def edit
    @item = Item.find( params[:id] )
    render :json => @item
  end
  
  def update
    @item = Item.find( params[:id] )
    
    if @item.update_attributes( params.require(:item).permit( :title, :host, :url ) )
      render :json => @item
    end
  end
  
  def destroy
    @item = Item.find( params[:id] )
    @item.destroy
  end
  
  
  private
    
    def item_params
      params.require(:item).permit( :title, :host, :url )
    end
  
end