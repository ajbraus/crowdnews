class CreateBeats < ActiveRecord::Migration
  def change
    create_table :beats do |t|
      t.references :user, index: true
      t.string :name
      t.text :description

      t.timestamps
    end
    add_column :posts, :beat_id, :integer, index: true
  end
end
