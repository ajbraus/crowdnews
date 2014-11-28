object @beat
attributes :id, :name, :description, :pic_url, :video_url

child(:backers) do
  attributes :id, :name
end

node(:tags) { |b| b.posts.map { |p| p.tags }.uniq.flatten }

child(:posts) do
  extends "api/v1/posts/show"
end

child(:users) do
  attributes :id, :name, :bio, :earnings_range
  node(:pic_url) {|u| u.avatar.url }
  node(:tags) {|u| u.posts.map { |p| p.tags }.uniq.flatten }
end