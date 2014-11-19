class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  # protect_from_forgery with: :exception

  # before_filter :configure_permitted_parameters, if: :devise_controller?
  helper_method :current_city, :current_user, :upload_image, :coride_account

  def after_sign_in_path_for(resource)
    if current_user.sign_in_count == 1
      edit_user_path(current_user)
    else
      root_path
    end
  end


  def index
  end

  protected

  def upload_image(data)
    # CREATE TEMP FILE
    tempfile = Tempfile.new("fileupload")
    tempfile.binmode
    tempfile.write(Base64.decode64(data.split(',').pop)) # BASE 64 DATA IS AFTER FIRST COMMA

    # SET MIME TYPE & FILE NAME
    mime_type = Mime::Type.lookup(data.split(";")[0][5..100]).to_s
    file_type = mime_type.split('/')[1]
    file_name = current_user.name + "s_" + Time.now.to_i.to_s.underscore + "." + file_type

    # CREATE PAPERCLIP-FRIENDLY UPLOAD FILE
    return uploaded_file = ActionDispatch::Http::UploadedFile.new(tempfile: tempfile, type: mime_type, filename: file_name)    
  end

  
  def configure_permitted_parameters
    devise_parameter_sanitizer.for(:sign_up) << :first_name 
    devise_parameter_sanitizer.for(:sign_up) << :last_name
    devise_parameter_sanitizer.for(:account_update) { |u| u.permit(:first_name, 
                                                                   :last_name,  
                                                                   :bio) }
  end

  def authenticate_user_from_token!
    if current_user.blank?
      return render status: 401,
                    json: { success: false, 
                            error: "Authentication Token Invalid or Missing." }
    end
  end

  def current_user
    @current_user = User.find_by(auth_token: params[:auth_token])
    @current_user ||= warden.authenticate(:scope => :user)
  end
end
