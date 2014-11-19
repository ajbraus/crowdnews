class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts do |t|
      t.string :title
      t.string :subtitle
      t.text :body
      t.datetime :published_at
      t.string :pic_url
      t.string :video_url
      t.references :user, index: true

      t.timestamps
    end
  end
end
