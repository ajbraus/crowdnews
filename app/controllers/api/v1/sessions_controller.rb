class Api::V1::SessionsController < Devise::SessionsController
  skip_before_filter :verify_authenticity_token
  prepend_before_filter :require_no_authentication, :only => [:create]
  
  def create
    # params[:user] = params[:session]
    #Added bang to raise exception when User is not found, otherwise nil user goes through unless statements
    @user = User.where('lower(email) = ?', user_params[:email].downcase).first! 

    unless @user
      return render :status => :unprocessable_entity,
             json: { success: false, :error => "No account exists with that email address." }
    end
    unless @user.valid_password?(user_params[:password])
      return render :status => :unprocessable_entity,
                    json: { success: false, :error => "The email or password you entered is incorrect." }
    end
    return render status: 200, json: { success: true, auth_token: @user.auth_token }
  end

  def destroy
    resource = warden.authenticate(:scope => :user, :store => false, :recall => "#{controller_path}#failure")
    resource.generate_auth_token
    return render :status => 204
  end

  private

  def user_params
    params.require(:user).permit(:email, :password, :remember_me)
  end
end