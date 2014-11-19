class AddRequestAcceptRejectToUsers < ActiveRecord::Migration
  def change
    add_column :users, :requested_at, :datetime
    add_column :users, :invited_at, :datetime
    add_column :users, :rejected_at, :datetime
    add_column :users, :accepted_at, :datetime
  end
end
