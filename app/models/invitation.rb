class Invitation < ActiveRecord::Base
  validates :email, :handle, presence: true
end
