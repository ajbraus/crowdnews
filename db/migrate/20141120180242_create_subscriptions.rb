class CreateSubscriptions < ActiveRecord::Migration
  def change
    create_table :subscriptions do |t|
      t.references :user, index: true
      t.references :beat, index: true
      t.integer :amount_in_cents
      t.integer :max_in_cents

      t.timestamps
    end
  end
end
