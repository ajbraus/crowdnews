class Api::V1::BeatsController < ApplicationController
  before_filter :authenticate_user_from_token!, except: [:show]

  def index
    @beats = Beat.all
    return render 'api/v1/beats/index'
  end
  
  def show
    @beat = Beat.includes(:posts).find(params[:id])
    return render 'api/v1/beats/show'
  end

  def create
    @beat = Beat.new(beat_params)
    @beat.users << current_user

    if @beat.save
      return render status: 200,
             :json => { :success => true, :beat_id => @beat.id}
    else
      return render status: 400,
             :json => { :success => false,
                        :error => @beat.errors }
    end
  end

  def update
    @beat = Beat.find(params[:id])
    if @beat.update_attributes(beat_params)
      return render status: 200,
             :json => { :success => true }
    else
      return render status: 400,
             :json => { :success => false,
                        :error => @beat.errors }
    end
  end

  def destroy
    @beat = Beat.find(params[:id]) 

    if @beat.destroy
      return render status: 200,
             :json => { :success => true }
    else
      return render status: 400,
             :json => { :success => false,
                        :error => @beat.errors }
    end
  end

  private

  def beat_params
    params[:beat][:tag_list] = params[:tag_list].map { |t| t["text"] }.join(", ") if params[:tag_list].present?
    params.require(:beat).permit(:name, :description, :published_at, :video_url, :pic_url, :tag_list)
  end
end
