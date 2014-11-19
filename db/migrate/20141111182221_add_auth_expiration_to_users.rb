class AddAuthExpirationToUsers < ActiveRecord::Migration
  def change
    add_column :users, :auth_token_expires_at, :datetime
  end
end
