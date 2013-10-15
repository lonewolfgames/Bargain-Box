class Item < ActiveRecord::Base

  # relations
  belongs_to :cart, touch: true

  # validations
  validates :title, :host, :url, presence: true
  validates_uniqueness_of :url, scope: :cart_id

  # states
  state_machine initial: :created do

    after_transition on: :parse, do: :scrape
    
    event :parse do
      transition created: :parsing
    end

    event :complete do
      transition parsing: :completed
    end

    state :parsing do
      validates :title, :host, :url, presence: true
    end

    state :complete do
      validates :raw_http_body, :product_title, :base_price, :image_url, presence: true
    end

  end

  after_create :parse!

  def base_price
    read_attribute(:base_price).to_f / 100
  end

  protected
    def scrape
      ScraperWorker.perform_async(self.id)
    end

end