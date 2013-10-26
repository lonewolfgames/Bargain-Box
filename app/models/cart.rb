class Cart < ActiveRecord::Base

  # relations
  belongs_to :user
  has_many :items, dependent: :destroy

  # nested resources
  accepts_nested_attributes_for :items

  # validations
  validates :title, presence: true
  validates_length_of :title, minimum: 3
end
