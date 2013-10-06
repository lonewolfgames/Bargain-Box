class AddFieldsToItems < ActiveRecord::Migration
  def change
    add_column :items, :base_price, :integer, default: 0
    add_column :items, :product_title, :string
    add_column :items, :image_url, :string
    add_column :items, :user_rating, :integer, default: 0
  end
end
