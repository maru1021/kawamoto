class ApplicationController < ActionController::Base
  helper_method :current_user

  private

  def current_user
    @current_user ||= User.find_by(id: session[:user_id]) if session[:user_id]
  end

  def authenticate_user!
    unless current_user
      respond_to do |format|
        format.html { redirect_to login_path, alert: "ログインが必要です" }
        format.json { render json: { error: "認証が必要です" }, status: :unauthorized }
        format.any { render json: { error: "認証が必要です" }, status: :unauthorized }
      end
    end
  end
end
