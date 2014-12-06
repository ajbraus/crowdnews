class Api::V1::UsersController < ApplicationController
  before_filter :authenticate_user_from_token!, except: [:index, :show]

  def index 
    @users = User.where('requested_at IS NOT NULL OR 
                         accepted_at IS NOT NULL OR 
                         invited_at IS NOT NULL OR
                         rejected_at IS NOT NULL')
    
    render 'api/v1/users/index'
  end

  def show
    binding.pry
    if params[:id] == params[:auth_token]
      @user = current_user
    else
      @user = User.find(params[:id])
    end

    render 'api/v1/users/show'
  end

  def update
    if current_user.update_attributes(user_params)
      return render 'api/v1/users/show'
    else
      return render status: 403, json: {error: "There was a problem updating your profile. Please try again."}
    end
  end

  def invite
    if current_user.admin?
      @user = User.find(params[:id])
      @user.update_attributes(invited_at: Time.now) 
      return render :status => 200, :json => { :success => true }
    else
      return render :status => 403, :json => { :success => false }
    end
  end

  def request
    if current_user.admin?
      @user = User.find(params[:id])
      @user.update_attributes(requested_at: Time.now) 
      return render :status => 200, :json => { :success => true }
    else
      return render :status => 403, :json => { :success => false }
    end
  end

  def accept
    if current_user.admin?
      @user = User.find(params[:id])
      @user.update_attributes(accepted_at: Time.now)
      return render :status => 200, :json => { :success => true }
    else
      return render :status => 403, :json => { :success => false }
    end
  end

  def reject
    if current_user.admin?
      @user = User.find(params[:id])
      @user.update_attributes(rejected_at: Time.now)
      return render :status => 200, :json => { :success => true }
    else
      return render :status => 403, :json => { :success => false }
    end
  end

  private 

  def user_params 
    if params[:avatar].present? && params[:avatar][0..4] != "https"
      params[:user][:avatar] =  upload_image(params[:avatar])
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