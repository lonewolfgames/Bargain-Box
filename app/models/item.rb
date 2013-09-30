class Item < ActiveRecord::Base

  # relations
  belongs_to :cart

  # validations
  validates :title, :host, :url, presence: true
end
