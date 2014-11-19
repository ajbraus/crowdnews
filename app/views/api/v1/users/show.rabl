object @user
attributes :id, :name, :bio, :earnings_range

node(:pic_url) {|u| u.avatar.url }

child(:backers) do
  attributes :id, :name
end

node(:tags) {|u| u.posts.map { |p| p.tags }.uniq.flatten }

if @show_posts 
  child(:posts) do 
    extends 'api/v1/posts/show'
  end
end