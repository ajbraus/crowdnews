class Subscription < ActiveRecord::Base
  belongs_to :user
  belongs_to :beat

  validates :user_id, :beat_id, presence: true
end
