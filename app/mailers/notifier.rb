class Notifier < ActionMailer::Base
  include UsersHelper
  include TripsHelper
  include ActionView::Helpers::AssetTagHelper  
  layout 'email' # use email.(html|text).erb as the layout for emails
  default from: "hello@crowdnews.com"

  def welcome(user)
    @user = user
    mail to: @user.email, subject: "Welcome to CrowdNews.com"
  end

  def request_accepted(user)
    @user = user
    mail to: @user.email, subject: "Get Started Posting Stories and Finding Backers"
  end
end