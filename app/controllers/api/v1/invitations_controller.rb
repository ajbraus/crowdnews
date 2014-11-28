class Api::V1::InvitationsController < ApplicationController

  def index
    @invitations = Invitation.all
    return render 'api/v1/invitations/index'
  end

  def create
    @invitation = Invitation.new(invitation_params)
    if @invitation.save
      return render status: 200,
             :json => { :success => true, :inivtiation_id => @invitation.id}
    else
      return render status: 400,
             :json => { :success => false,
                        :error => @invitation.errors }
    end
  end

  def destroy
    @invitation = Invitation.find(params[:id]) 

    if @invitation.destroy
      return render status: 200,
             :json => { :success => true }
    else
      return render status: 400,
             :json => { :success => false,
                        :error => @invitation.errors }
    end
  end

  private

  def invitation_params
    params.require(:invitation).permit(:email, :handle)
  end
end
