class HomeController < ApplicationController
  def index
    @pdf_thumbnails = Dir.glob(Rails.root.join('public', 'advertisement', 'thumbnails', '*_page_1.png')).sort_by { |file|
      name = File.basename(file)
      year = name[/^(\d{4})/, 1].to_i
      month = name[/^\d{4}-(\d+)/, 1].to_i
      year * 100 + month
    }.reverse
    @notis = Noti.all.order('id desc')
  end

  def post
    phone = params[:phone]
    if phone.length == 10
      phone = params[:phone].gsub(/(\d{4})(\d{2})(\d{4})/, '\1-\2-\3')
    elsif phone.length == 11
      phone = phone.gsub(/(\d{3})(\d{4})(\d{4})/, '\1-\2-\3')
    end

    post = params[:post]
    if post.length == 7
      post = post.gsub(/(\d{3})(\d{4})/, '\1-\2')
    end

    supporter = Supporter.new(
      name: params[:name],
      post: post,
      address: params[:address],
      phone: phone,
      birth: params[:birth]
    )

    if supporter.save
      render json: {message: true}
    else
      render json: {message: false}
    end
  end
end
