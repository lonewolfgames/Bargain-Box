class CartsController < ApplicationController

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
    @cart = Cart.new( params[:cart] )
    
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
    
    if @cart.update_attributes( params[:cart] )
      render :json => @cart
    end
  end
  
  def destroy
    @cart = Cart.find( params[:id] )
    @cart.destroy
  end
  
end
