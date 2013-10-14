class Item < ActiveRecord::Base

  # relations
  belongs_to :cart, touch: true

  # validations
  validates :title, :host, :url, presence: true
  validates_uniqueness_of :url, scope: :cart_id

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

  protected
    def parse_page
      ScraperWorker.perform_async(self.id)
    end

end
