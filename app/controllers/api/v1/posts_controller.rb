class Api::V1::PostsController < ApplicationController
  before_filter :authenticate_user_from_token!, except: [:index, :show, :filter]
  
  def filter
    @posts = Post.all
    return render 'api/v1/posts/filter'                 
  end

  def index
    @posts = Post.all
    return render 'api/v1/posts/index'
  end

  def show
    @post = Post.find(params[:id])
    return render 'api/v1/posts/show'
  end

  def create
    binding.pry
    @post = current_user.posts.new(post_params)
    if @post.save
      return render status: 200,
             :json => { :success => true, :trip_id => @post.id}
    else
      return render status: 400,
             :json => { :success => false,
                        :error => @post.errors }
    end
  end

  def update
    @post = Post.find(params[:id])
    if @post.update_attributes(post_params)
      return render status: 200,
             :json => { :success => true }
    else
      return render status: 400,
             :json => { :success => false,
                        :error => @post.errors }
    end
  end

  def destroy
    @post = Post.find(params[:id]) 

    if @post.destroy
      return render status: 200,
             :json => { :success => true }
    else
      return render status: 400,
             :json => { :success => false,
                        :error => @post.errors }
    end
  end

  private

  def post_filter_param
    params.require(:post).permit(:title, :subtitle, :body, :published_at)
  end

  def post_params
    params.require(:post).permit(:title, :subtitle, :body, :published_at, :video_url, :pic_url)
  end
end
