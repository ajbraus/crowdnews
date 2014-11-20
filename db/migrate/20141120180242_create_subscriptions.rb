class CreateSubscriptions < ActiveRecord::Migration
  def change
    create_table :subscriptions do |t|
      t.references :backer, index: true
      t.references :backed_user, index: true
      t.integer :amount_in_cents
      t.integer :max_in_cents

      t.timestamps
    end
  end
end
