class Item < ActiveRecord::Base
  # inheritance
  include PageParser

  # relations
  belongs_to :cart

  # validations
  validates :title, :host, :url, presence: true

  # states
  state_machine initial: :created do

    before_transition on: :parse, do: :parse_page
    
    event :parse do
      transition created: :parsing
    end

    event :complete do
      transition parsing: :completed
    end

  end

  after_create :parse!

  def base_price
    read_attribute(:base_price).to_f / 100
  end

  def base_price=(price)
    write_attribute(:base_price, price * 100)
  end

end
