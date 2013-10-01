class Cart < ActiveRecord::Base

  # relations
  belongs_to :user
  has_many :items

  # validations
  validates :title, presence: true
end
