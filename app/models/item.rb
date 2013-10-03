class Item < ActiveRecord::Base

  # relations
  belongs_to :cart

  # validations
  validates :title, :host, :url, presence: true

  def base_price
    read_attribute(:base_price).to_f / 100
  end

  def base_price=(price)
    write_attribute(:base_price, price * 100)
  end

end
