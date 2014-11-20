class Subscription < ActiveRecord::Base
  belongs_to :backer, class_name: "User"
  belongs_to :backed_user, class_name: "User"

  validates :backer_id, :backed_user_id, presence: true
end
