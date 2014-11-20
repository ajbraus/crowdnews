class Api::V1::UsersController < ApplicationController
  before_filter :authenticate_user_from_token!, except: [:show, :index]

  def index
    if params[:kind] = "trending_journalists"
      @users = User.where("accepted_at IS NOT NULL")
    else
      @users = User.all
    end
  end

  def show
    @user = User.find(params[:id])

    render 'api/v1/users/show'
  end

  def update
    if current_user.update_attributes(user_params)
      return render 'api/v1/users/show'
    else
      return render status: 403, json: {error: "There was a problem updating your profile. Please try again."}
    end
  end

  private 

  def user_params 
    if params[:avatar].present? && params[:avatar][0..4] != "https"
      params[:user][:avatar] =  upload_image(params[:avatar])
    end
    if params[:requested_at].present?
      params[:requested_at] = Time.at(params[:requested_at])
    end

    params.require(:user).permit(:email, 
                                :first_name,
                                :last_name,
                                :password, 
                                :password_confirmation, 
                                :remember_me, 
                                :terms,
                                :avatar,
                                :bio,
                                :phone_number,
                                :requested_at,
                                #notification settings
                                :digest
                                )
  end
end