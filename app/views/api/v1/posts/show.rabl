object @post
attributes :id, :title, :subtitle, :body, :published, :updated_at

child(:tags) do
  attributes :id, :name
end

child(:user) do
  attributes :id, :name, :bio, :earnings_range
  node(:pic_url) {|u| u.avatar.url }
  # node(:backers_count) { |u| u.backers.count }
  node(:tags) {|u| u.posts.map { |p| p.tags }.uniq.flatten }
end