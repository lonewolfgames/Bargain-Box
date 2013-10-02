class CreateItems < ActiveRecord::Migration
  def change
    create_table :items do |t|
      t.references :cart, index: true
      t.string :title
      t.string :host
      t.string :url

      t.timestamps
    end
  end
end
