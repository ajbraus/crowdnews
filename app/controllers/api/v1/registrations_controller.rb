# file: app/controllers/api/v1/registrations_controller.rb
class Api::V1::RegistrationsController < Devise::RegistrationsController

  def create
    #sign_up_param = devise_parameter_sanitizer.sanitize(:sign_up)
    build_resource(user_params)
    
    if resource.save
      sign_in(resource, :store => false)
      return render :status => 200,
           :json => { :success => true,
                      :info => "Registered",
                      :auth_token => resource.auth_token }
    else
      return render :status => :unprocessable_entity,
             :json => { :success => false,
                        :error => resource.errors }
    end
  end

  def update
    # For Rails 4
    account_update_params = devise_parameter_sanitizer.sanitize(:account_update)
    # For Rails 3
    # account_update_params = params[:user]

    # required for settings form to submit when password is left blank
    if account_update_params[:password].blank?
      account_update_params.delete("password")
      account_update_params.delete("password_confirmation")
    end

    @user = User.find(current_user.id)
    if @user.update_attributes(account_update_params)
      city = City.find_by(name:params[:location])
      @user.update_attributes(city: city) if city
      set_flash_message :notice, :updated
      # Sign in the user bypassing validation in case his password changed
      sign_in @user, :bypass => true
      redirect_to after_update_path_for(@user)
    else
      render "edit"
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :first_name, :last_name, :password, :remember_me)
  end
end