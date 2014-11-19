class AddAttrsToUsers < ActiveRecord::Migration
  def change
    add_column :users, :auth_token, :string, index:true
    add_column :users, :bio, :text
    add_column :users, :earnings_range, :string
    add_column :users, :terms, :boolean
    add_column :users, :digest, :string, default: "Immediate"
  end
end
