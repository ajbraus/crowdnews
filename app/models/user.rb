class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
         
  has_many :posts

  
  # has_many :friends, :through => :friendships
  # has_many :inverse_friendships, :class_name => "Friendship", :foreign_key => "friend_id"
  # has_many :inverse_friends, :through => :inverse_friendships, :source => :user

  has_many :subscriptions, foreign_key: "backer_id"
  has_many :backers, through: :subscriptions, foreign_key: "backer_id", class_name: "User" #people backing a journalist
  has_many :inverse_subscriptions, class_name: "Subscription", foreign_key: "backed_user_id"
  has_many :backed_users, through: :inverse_subscriptions, foreign_key: "backed_user_id", class_name: "User" #jouranlists a user backs

    # backers 
      # amount_in_cents
      # max_in_cents

  has_attached_file :avatar, :styles => { :medium => "300x300>", :thumb => "100x100>" }, :default_url => "/images/:style/missing.png"
  validates_attachment_content_type :avatar, :content_type => /\Aimage\/.*\Z/

  before_create :generate_auth_token
  before_create :set_auth_token_expiration

  def name
    first_name
  end

  def full_name
    first_name + " " + last_name
  end

  def journalist?
    accepted_at.present?
  end

  def accept
    update_attributes(accepted_at: Time.now)
    Notifier.delay.request_accepted(self)
  end

  private

  # def generate_phone_tokens
  #   self.phone_token = SecureRandom.random_number(100000)
  # end
  
  def generate_auth_token
    begin
      self.auth_token = SecureRandom.hex
    end while self.class.exists?(auth_token: auth_token)
  end

  def set_auth_token_expiration
    self.auth_token_expires_at = DateTime.now + 60.days
  end
end
