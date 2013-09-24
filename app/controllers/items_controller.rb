class ItemsController < ApplicationController
  
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
    @item = Item.new( params[:item] )
    
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
    
    if @item.update_attributes( params[:item] )
      render :json => @item
    end
  end
  
  def destroy
    @item = Item.find( params[:id] )
    @item.destroy
  end
  
end
