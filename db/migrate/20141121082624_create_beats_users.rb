class CreateBeatsUsers < ActiveRecord::Migration
  def change
    create_table :beats_users do |t|
      t.belongs_to :beat
      t.belongs_to :user
    end
  end
end
