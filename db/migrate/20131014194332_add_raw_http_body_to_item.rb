class AddRawHttpBodyToItem < ActiveRecord::Migration
  def change
    add_column :items, :raw_http_body, :text
  end
end
