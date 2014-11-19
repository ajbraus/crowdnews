class Api::V1::ConfirmationsController < Api::ApiApplicationController
  before_filter :authenticate_user_from_token!

  def create
    @user = current_user
    message = "Confirmation email resent."
    if @user[:email] != confirm_params[:email]
      @user.update_attributes(email: confirm_params[:email],
                              unconfirmed_email: confirm_params[:email],
                              confirmation_token: nil,
                              confirmed_at: nil,
                              confirmation_sent_at: nil)
      message = message + " Email was updated to #{confirm_params[:email]}."
    end
    @user.delay.send_confirmation_instructions
    return render status: 200, json: { success: true, message: message }
  end

  private

  def confirm_params
    params.permit(:email)
  end
end