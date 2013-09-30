
class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  
  # relations
  has_many :carts
  has_many :items, through: :carts
  
  # hooks
  before_create :generate_auth_token
  
  
  def generate_auth_token
    self.auth_token = loop do
      random_token = Digest::SHA1.hexdigest(Time.now.to_s)
      break random_token unless self.class.where( auth_token: random_token).exists?
    end
  end

end
