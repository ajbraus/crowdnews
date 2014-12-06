class AddAdminToUsers < ActiveRecord::Migration
  def change
    remove_column :users, :earnings_range
    add_column :users, :admin, :boolean, default: false
  end
end
