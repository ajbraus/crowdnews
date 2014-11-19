object @post
attributes :id, :title, :subtitle, :body, :published, :updated_at

child(:tags) do
  attributes :id, :name
end