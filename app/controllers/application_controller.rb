class ApplicationController < ActionController::Base
  helper_method :current_user
  before_action :set_security_headers

  private

  def set_security_headers
    response.headers['X-Content-Type-Options'] = 'nosniff'
    response.headers['X-Frame-Options'] = 'SAMEORIGIN'
    response.headers['Referrer-Policy'] = 'strict-origin-when-cross-origin'
    response.headers['Permissions-Policy'] = 'camera=(), microphone=(), geolocation=()'
  end

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
