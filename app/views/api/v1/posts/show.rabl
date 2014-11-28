object @post
attributes :id, :title, :subtitle, :body, :published_at, :updated_at, :pic_url, :video_url

node(:published) { |p| p.published_at.present? }

child(:tags) do
  attributes :id, :name
end

child(:beat) do
  attributes :id, :name, :description, :pic_url, :video_url
  node(:tags) { |b| b.posts.map { |p| p.tags }.uniq.flatten }
end

child(:user) do
  attributes :id, :name, :bio, :earnings_range
  node(:pic_url) {|u| u.avatar.url }
  # node(:backers_count) { |u| u.backers.count }
  node(:tags) {|u| u.posts.map { |p| p.tags }.uniq.flatten }
end