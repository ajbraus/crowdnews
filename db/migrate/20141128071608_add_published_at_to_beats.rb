class AddPublishedAtToBeats < ActiveRecord::Migration
  def change
    add_column :beats, :published_at, :datetime
    add_column :beats, :video_url, :string
    add_column :beats, :pic_url, :string
  end
end
