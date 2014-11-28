object @user
attributes :id, :name, :bio, :earnings_range

node(:pic_url) {|u| u.avatar.url }

child(:beats) do
  attributes :id, :name, :description
  child(:posts) do 
    extends 'api/v1/posts/show'
  end
end

node(:tags) {|u| u.posts.map { |p| p.tags }.uniq.flatten }
