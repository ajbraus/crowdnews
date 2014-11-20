class Api::V1::PostsController < ApplicationController
  before_filter :authenticate_user_from_token!

  def create
    @subscription = current_user.subscriptions.build(subscription_params)
    
    if @subscription.save
      return render status: 200,
             :json => { :success => true, :subscription_id => @subscription.id}
    else
      return render status: 400,
             :json => { :success => false,
                        :error => @subscription.errors }
    end
  end

  def update 
    @subscription = current_user.subscriptions.find(params[:id])

    if @subscription.update_attributes(subscription_params)
      return render status: 200,
             :json => { :success => true, :subscription_id => @subscription.id}
    else
      return render status: 400,
             :json => { :success => false,
                        :error => @subscription.errors }
    end
  end

  def destroy
    @subscription = current_user.subscriptions.find(params[:id])

    if @subscription.destroy
      return render status: 200,
             :json => { :success => true, :subscription_id => @subscription.id}
    else
      return render status: 400,
             :json => { :success => false,
                        :error => @subscription.errors }
    end
  end

  private

  def subscription_params
    params.require(:subscription).permit(:backed_user_id, :max_in_cents, :amount_in_cents)
  end
end
