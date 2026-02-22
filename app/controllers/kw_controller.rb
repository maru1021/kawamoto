class KwController < ApplicationController
  layout "admin"

  before_action :authenticate_user!

  def index
    @supporters = Supporter.all
    @notis = Noti.all.order('id desc')
    {message: true}
  end
end
