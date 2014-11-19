class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
         
  has_many :posts

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
